import React from "react";

const Popup = () => {
    const handleClose = () => {
        window.location.reload(); // 현재 페이지 새로고침
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
        fontFamily: 'content'
      }}
    >
      <p
        style={{
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        날짜, 시간, 테이블을 모두 선택해주세요.
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
