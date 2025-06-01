import RoundedBox from "./loginBackground";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import logo from "../../assets/logoBlack.png";
import LoginSuccessPopup from "../Popup/loginSuccessPopup";
import LoginFailPopup from "../Popup/loginFailPopup";

function SignUpButton() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        gap: "30px",
        marginTop: "12px",
      }}
    >
      <span
        style={{
          fontFamily: "content",
          fontSize: "12px",
          fontWeight: "bold",
          color: "gray",
        }}
      >
        처음이신가요?
      </span>
      <Link
        to="/signup"
        style={{
          fontFamily: "content",
          fontWeight: "bold",
          color: "gray",
          textDecoration: "underline",
          fontSize: "12px",
        }}
      >
        회원가입하기
      </Link>
    </div>
  );
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailPopup, setShowFailPopup] = useState(false);

  const [pwType, setpwType] = useState({
    type: "password",
    visible: false,
  });

  const handlePasswordType = () => {
    setpwType((prev) => ({
      type: prev.visible ? "password" : "text",
      visible: !prev.visible,
    }));
  };

  const topInputStyle = {
    width: "400px",
    height: "50px",
    color: "black",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "1px solid gray",
    padding: "0 12px",
    fontSize: "16px",
    alignSelf: "center",
    outline: "none",
  };

  const bottomInputStyle = {
    width: "400px",
    height: "50px",
    color: "black",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "1px solid gray",
    padding: "0 12px",
    fontSize: "16px",
    alignSelf: "center",
    outline: "none",
  };

  const buttonStyle = {
    width: "120px",
    height: "40px",
    backgroundColor: "white",
    color: "black",
    border: "1px solid gray",
    borderRadius: "0px",
    fontFamily: "content",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "40px",
    alignSelf: "center",
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setShowSuccessPopup(true);
      } else {
        setShowFailPopup(true);
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      setShowFailPopup(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F9F7F8",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={logo}
        alt="로고"
        style={{
          height: "60px",
          objectFit: "contain",
          paddingBottom: "30px",
          paddingTop: "90px",
        }}
      />
      <RoundedBox>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "title",
          }}
        >
          로그인
        </h2>
        <input
          type="text"
          id="username"
          placeholder="아이디를 입력하세요"
          style={topInputStyle}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={(e) => (e.target.style.background = "#DAE1EE")}
          onBlur={(e) => (e.target.style.background = "")}
        />
        <input
          type={pwType.type}
          id="password"
          placeholder="비밀번호를 입력하세요"
          style={bottomInputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={(e) => (e.target.style.background = "#DAE1EE")}
          onBlur={(e) => (e.target.style.background = "")}
        />
        <div
          style={{
            paddingLeft: "38px",
            marginTop: "10px",
            width: "400px",
          }}
        >
          <input
            type="checkbox"
            checked={pwType.visible}
            onChange={handlePasswordType}
            id="showPassword"
            style={{ marginRight: "8px" }}
          />
          <label
            htmlFor="showPassword"
            style={{ fontFamily: "content", fontSize: "14px", color: "gray" }}
          >
            {"비밀번호 보기"}
          </label>
        </div>
        <button style={buttonStyle} onClick={handleLogin}>
          로그인
        </button>
        <SignUpButton />
      </RoundedBox>

      {showSuccessPopup && <LoginSuccessPopup />}
      {showFailPopup && <LoginFailPopup />}
    </div>
  );
}

export default LoginForm;
