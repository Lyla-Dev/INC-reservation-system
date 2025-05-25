import React from 'react';

function ReservationStatusBox({ date, time, phoneNumber, numberOfPeople, tableType }) {
  return (
    <div style={{
      width: '80%',
      maxWidth: '600px',
      padding: '30px',
      marginBottom: '30px',
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '20px' }}>
        {date} {time}
      </h2>
      <p style={{ fontSize: '1em', lineHeight: '1.6', color: '#555' }}>
        <span style={{ fontSize: '16px'}}>전화번호:</span> {phoneNumber}
      </p>
      <p style={{ fontSize: '1em', lineHeight: '1.6', color: '#555' }}>
        <span style={{ fontSize: '16px'}}>인원 수:</span> {numberOfPeople}
      </p>
      <p style={{ fontSize: '1em', lineHeight: '1.6', color: '#555' }}>
        <span style={{ fontSize: '16px'}}>테이블 종류:</span> {tableType}
      </p>
    </div>
  );
}

export default ReservationStatusBox;