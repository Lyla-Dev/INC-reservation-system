import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReserveFailPopup from "../Popup/reservefailPopup";

const Reservation = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [mealType, setMealType] = useState(null);
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showFailPopup, setShowFailPopup] = useState(false);

  const navigate = useNavigate();

  const today = new Date();
  const dateList = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i + 1);
    return date.toISOString().slice(0, 10);
  });

  useEffect(() => {
    if (selectedDate && mealType) {
      fetch(
        `http://localhost:5000/reservations/available_tables?date=${selectedDate}&meal=${mealType}`,
        { credentials: "include" }
      )
        .then((res) => res.json())
        .then((data) => setAvailableTables(data))
        .catch((err) => console.error("테이블 불러오기 실패:", err));
    }
  }, [selectedDate, mealType]);

  const handleNext = () => {
    if (selectedDate && mealType && selectedTable) {
      const table = availableTables.find(
        (t) => String(t.table_id) === String(selectedTable)
      );

      console.log("availableTables:", availableTables);
      console.log("selectedTable:", selectedTable);
      console.log("navigate로 넘길 table:", table);

      if (!table) {
        alert("⚠️ 선택한 테이블 정보를 찾을 수 없습니다.");
        return;
      }

      navigate("/reservationInfo", {
        state: {
          date: selectedDate,
          meal: mealType,
          table,
        },
      });
    } else {
      setShowFailPopup(true);
    }
  };

  const isNextButtonEnabled = selectedDate && mealType && selectedTable;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        display: "flex",
        gap: "40px",
        padding: "20px",
        position: "relative",
        fontFamily: "content",
        backgroundColor: "#F9F7F8",
      }}
    >
      <div style={{ width: "250px" }}>
        <h3>날짜 선택</h3>
        <div
          style={{
            fontFamily: "content",
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {dateList.map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              style={{
                fontFamily: "content",
                display: "block",
                width: "100%",
                marginBottom: "6px",
                padding: "8px",
                backgroundColor: selectedDate === date ? "#3F72AF" : "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {date}
            </button>
          ))}
        </div>

        <h3 style={{ marginTop: "20px" }}>시간대 선택</h3>
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            onClick={() => setMealType("lunch")}
            style={{
              fontFamily: "content",
              padding: "8px 16px",
              backgroundColor: mealType === "lunch" ? "#3F72AF" : "#DBE2EF",
              color: mealType === "lunch" ? "#fff" : "#333",
              border: "0",
              borderRadius: "0px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow:
                mealType === "lunch" ? "0 2px 6px rgba(0,0,0,0.2)" : "none",
              transition: "all 0.2s ease-in-out",
            }}
          >
            Lunch (12시)
          </button>
          <button
            onClick={() => setMealType("dinner")}
            style={{
              fontFamily: "content",
              padding: "8px 16px",
              backgroundColor: mealType === "dinner" ? "#3F72AF" : "#DBE2EF",
              color: mealType === "dinner" ? "#fff" : "#333",
              border: "0",
              borderRadius: "0px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow:
                mealType === "dinner" ? "0 2px 6px rgba(0,0,0,0.2)" : "none",
              transition: "all 0.2s ease-in-out",
            }}
          >
            Dinner (18시)
          </button>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h3>테이블 선택</h3>
        {availableTables.length === 0 && selectedDate && mealType && (
          <p>선택된 시간대에 가능한 테이블이 없습니다.</p>
        )}
        {availableTables.map((table) => (
          <button
            key={table.table_id}
            onClick={() => setSelectedTable(table.table_id)}
            style={{
              fontFamily: "content",
              margin: "5px",
              padding: "10px",
              backgroundColor:
                selectedTable === table.table_id ? "#3F72AF" : "#DBE2EF",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {table.table_id} - {table.location} ({table.capacity}인석)
          </button>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <button
          disabled={!isNextButtonEnabled}
          onClick={handleNext}
          style={{
            marginTop: "24px",
            padding: "8px 16px",
            border: "0",
            backgroundColor: "#DBE2EF",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          다음
        </button>
      </div>

      {showFailPopup && <ReserveFailPopup />}
    </div>
  );
};

export default Reservation;
