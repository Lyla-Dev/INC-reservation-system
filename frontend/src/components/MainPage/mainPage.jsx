import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoWhite.png";
import LogoutConfirmPopup from "../Popup/logoutConfirmPopup";

const MainPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleNext_Reservation = () => {
    navigate("/reservation");
  };

  const handelNext_Status = () => {
    navigate("/reservationStatus");
  };

  const boxStyle = {
    width: "300px",
    height: "400px",
    backgroundColor: "rgba(234, 234, 234, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "title",
    fontWeight: "bold",

    fontSize: "20px",
    borderRadius: "0px",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    transition: "all 0.2s",
    cursor: "pointer",
  };

  const hoverStyle = {
    ...boxStyle,
    transform: "scale(1.05)",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    backgroundColor: "rgba(234, 234, 234, 0.85)",
  };

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const blocks = ["예약하기", "예약 확인하기"];

  const handleLogout = () => {
    setShowConfirmPopup(true);

    try {
      const response = fetch("http://localhost:5000/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      }
    } catch (error) {
      console.error("로그아웃 요청 중 오류 발생:", error);
      alert("로그아웃 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/src/assets/background1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "150px",
      }}
    >
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        {isLoggedIn && (
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              paddingTop: "40px",
              paddingRight: "40px",
              color: "#fff",
              cursor: "pointer",
              fontSize: "12px",
              fontFamily: "content",
            }}
            onClick={handleLogout}
          >
            로그아웃
          </button>
        )}
      </div>

      <img
        src={logo}
        alt="Sogo Logo"
        style={{
          height: "60px",
          objectFit: "contain",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "80px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {blocks.map((label, index) => (
          <div
            key={index}
            style={{
              ...(hoveredIndex === index ? hoverStyle : boxStyle),
              color: "rgb(0, 0, 0)",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => {
              if (label === "예약하기") {
                handleNext_Reservation();
              } else handelNext_Status();
            }}
          >
            {label}
          </div>
        ))}
        {showConfirmPopup && (
          <LogoutConfirmPopup onCancel={() => setShowConfirmPopup(false)} />
        )}
      </div>
    </div>
  );
};

export default MainPage;
