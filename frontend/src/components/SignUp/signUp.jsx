import React, { useState } from "react";
import SignupSuccessPopup from "../Popup/signupSuccessPopup";
import LoginFailPopup from "../Popup/loginFailPopup";

function SignUp() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [pwType, setpwType] = useState({
    type: "password",
    visible: false,
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailPopup, setShowFailPopup] = useState(false);

  const handlePasswordType = () => {
    setpwType((prev) => ({
      type: prev.visible ? "password" : "text",
      visible: !prev.visible,
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id === "id" ? "username" : id;
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const isFormComplete = form.username.trim() && form.password.trim();

  const inputBaseStyle = {
    width: "100%",
    height: "32px",
    padding: "4px 8px",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "1px solid gray",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    marginBottom: "4px",
    fontFamily: "content",
    fontWeight: "bold",
    textAlign: "left",
    width: "100%",
  };

  const containerStyle = {
    width: "400px",
    margin: "0 auto",
    padding: "60px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "flex-start",
  };

  const handleSignUp = async () => {
    if (!isFormComplete) {
      setShowFailPopup(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      if (response.ok) {
        setShowSuccessPopup(true);
      } else {
        setShowFailPopup(true);
      }
    } catch (error) {
      console.error("회원가입 요청 중 오류 발생:", error);
      alert("회원가입 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        backgroundColor: "#F9F7F8",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <h2 style={{ marginBottom: "24px", fontFamily: "title" }}>회원가입</h2>
      <div style={containerStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            paddingBottom: "30px",
          }}
        >
          <label htmlFor="id" style={labelStyle}>
            아이디
          </label>
          <input
            type="text"
            id="id"
            value={form.username}
            onChange={handleInputChange}
            style={inputBaseStyle}
            onFocus={(e) => (e.target.style.background = "#DAE1EE")}
            onBlur={(e) => (e.target.style.background = "")}
          />
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <label htmlFor="password" style={labelStyle}>
            비밀번호
          </label>
          <input
            type={pwType.type}
            id="password"
            value={form.password}
            onChange={handleInputChange}
            style={inputBaseStyle}
            onFocus={(e) => (e.target.style.background = "#DAE1EE")}
            onBlur={(e) => (e.target.style.background = "")}
          />
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <input
              type="checkbox"
              checked={pwType.visible}
              onChange={handlePasswordType}
              id="showPassword"
            />
            <label
              htmlFor="showPassword"
              style={{
                marginLeft: "8px",
                marginBottom: "0px",
                fontFamily: "content",
              }}
            >
              {"비밀번호 보기"}
            </label>
          </div>
        </div>
      </div>

      <button
        disabled={!isFormComplete}
        onClick={handleSignUp}
        style={{
          marginTop: "24px",
          padding: "8px 16px",
          border: "0px solid #aaa",
          backgroundColor: isFormComplete ? "#DAE1EE" : "#e0e0e0",
          color: isFormComplete ? "#000" : "#777",
          cursor: isFormComplete ? "pointer" : "not-allowed",
          fontSize: "14px",
        }}
      >
        완료
      </button>

      {showSuccessPopup && <SignupSuccessPopup />}
      {showFailPopup && <LoginFailPopup />}
    </div>
  );
}

export default SignUp;
