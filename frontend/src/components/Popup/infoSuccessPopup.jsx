import React from "react";
import { useNavigate } from "react-router-dom";

const Popup = ({ date, meal, table }) => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/mainpage');
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
        예약이 완료되었습니다.
      </p>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          marginBottom: "20px",
          textAlign: "left",
          borderRadius: "6px",
          backgroundColor: "#f9f9f9"
        }}
      >
        <p><strong>[예약정보]</strong></p>
        <p>날짜: {date}</p>
        <p>시간: {meal === 'lunch' ? '12:00 (Lunch)' : '18:00 (Dinner)'}</p>
        <p>테이블: {table.table_id}, {table.location}, {table.capacity}인석</p>
      </div>

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