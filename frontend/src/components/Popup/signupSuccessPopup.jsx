import React from "react";
import { useNavigate } from "react-router-dom";

const Popup = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/');
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
        fontFamily: "content"
      }}
    >
      <p style={{ fontWeight: "bold", marginBottom: "16px" }}>
        회원 가입이 완료되었습니다.
      </p>

      <button
        onClick={handleClose}
        style={{
          padding: "6px 16px",
          border: "1px solid #999",
          backgroundColor: "#f0f0f0",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        닫기
      </button>
    </div>
  );
};

export default Popup;