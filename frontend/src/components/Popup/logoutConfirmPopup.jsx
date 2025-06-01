import React from "react";
import { useNavigate } from "react-router-dom";

const Popup = ({ onCancel }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        border: "1px solid #aaa",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        padding: "24px",
        borderRadius: "8px",
        zIndex: 1000,
        minWidth: "300px",
        textAlign: "center",
        fontFamily: "content",
      }}
    >
      <p
        style={{
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        로그아웃 하시겠습니까?
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button style={buttonStyle} onClick={handleConfirm}>
          예
        </button>
        <button style={buttonStyle} onClick={onCancel}>
          아니오
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "6px 16px",
  border: "1px solid #999",
  backgroundColor: "#f0f0f0",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Popup;
