import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InfoSuccessPopup from '../Popup/infoSuccessPopup';
import InfoFailPopup from '../Popup/infoFailPopup';

function ReservationInfo() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    card: ["", "", "", ""],
    people: "",
  });

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showFailPopup, setShowFailPopup] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { date, meal, table } = location.state || {};
    console.log("🧾 location.state:", location.state);
    const tableInfo = table;

    const handleSubmit = () => {
      if (!tableInfo) {
        setShowFailPopup(true);
        return;
      }

      if (parseInt(form.people) > tableInfo.capacity) {
        setShowFailPopup(true);
        return;
      }

      const payload = {
        name: form.name,
        phone: form.phone,
        card: form.card.join('-'),
        guest_count: form.people,
        table_id: tableInfo.table_id,
        date,
        meal
      };

      fetch('http://localhost:5000/reservations/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
        .then((res) => {
          if (res.ok) return res.json();
          else throw new Error('예약 실패');
        })
        .then(() => {
          setShowSuccessPopup(true);
          navigate("/reservationStatus");
        })
        .catch((err) => {
          console.error("예약 요청 실패:", err);
          setShowFailPopup(true);
        });
    };
    
      const cardRefs = [useRef(), useRef(), useRef(), useRef()];

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone' && !/^\d*$/.test(value)) return;
        setForm({ ...form, [name]: value });
      };
    
      const handleCardChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const updatedCard = [...form.card];
        updatedCard[index] = value;
        setForm({ ...form, card: updatedCard });

        if (value.length === 4 && index < 3) {
            cardRefs[index + 1].current.focus();
          }
      };
    
      const isFormComplete =
        form.name.trim() &&
        form.phone.trim() &&
        form.people &&
        form.card.every((num) => num.trim().length === 4);
    
      const inputBaseStyle = {
        height: '32px',
        padding: '4px 8px',
        border: '1px solid #aaa',
        borderRadius: '6px',
        fontSize: '14px',
        outline: 'none',
      };

      const labelStyle = {
        marginBottom: '10px',
        fontWeight: 'bold',
      };
    
      const containerStyle = {
        width: '400px',
        margin: '0 auto',
        padding: '24px',
        border: '1px solid #aaa',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      };
    
      const cardInputStyle = {
        ...inputBaseStyle,
        width: '60px',
        textAlign: 'center',
      };

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontFamily: "content",
        minHeight: "100vh",
        backgroundColor: "#F9F7F8",
      }}
    >
      <h2 style={{ marginBottom: "24px" }}>예약자 정보 입력</h2>

      <div style={containerStyle}>
        <div
          style={{
            marginBottom: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label style={labelStyle}>이름</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="이름을 입력하세요"
            style={{
              ...inputBaseStyle,
            }}
            onFocus={(e) => (e.target.style.background = "#DFF0FA")}
            onBlur={(e) => (e.target.style.background = "")}
          />
        </div>

        <div
          style={{
            marginBottom: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label style={labelStyle}>전화번호</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
            placeholder="예: 01012345678"
            style={inputBaseStyle}
            onFocus={(e) => (e.target.style.background = "#DFF0FA")}
            onBlur={(e) => (e.target.style.background = "")}
          />
        </div>

        <div
          style={{
            marginBottom: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label style={labelStyle}>카드 번호</label>
          <div style={{ display: "flex", gap: "10px" }}>
            {form.card.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="4"
                value={value}
                onChange={(e) => handleCardChange(index, e.target.value)}
                style={cardInputStyle}
                onFocus={(e) => (e.target.style.background = "#DFF0FA")}
                onBlur={(e) => (e.target.style.background = "")}
                ref={cardRefs[index]}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label style={labelStyle}>이용 인원 수</label>
          <select
            name="people"
            value={form.people}
            onChange={handleInputChange}
            style={{ ...inputBaseStyle, width: "120px" }}
            onFocus={(e) => (e.target.style.background = "#DFF0FA")}
            onBlur={(e) => (e.target.style.background = "")}
          >
            <option value="">선택</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num}명
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        disabled={!isFormComplete}
        onClick={handleSubmit}
        style={{
          marginTop: "24px",
          padding: "8px 16px",
          border: "0px solid #aaa",
          backgroundColor: isFormComplete ? "#DFF0FA" : "#e0e0e0",
          color: isFormComplete ? "#000" : "#777",
          cursor: isFormComplete ? "pointer" : "not-allowed",
          fontSize: "14px",
        }}
      >
        완료
      </button>

      {showSuccessPopup && <InfoSuccessPopup date={date} meal={meal} table={tableInfo} />}
      {showFailPopup && <InfoFailPopup />}
    </div>
  );
}

export default ReservationInfo;
