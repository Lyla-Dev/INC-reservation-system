import React from 'react';
import './ReservationStatus.css'; 

const ReservationStatusBox = ({ date, time, phoneNumber, guests, tableType, cancellationDeadline, onCancel, reservationId }) => {
  return (
    <div className="reservation-card-container">
      <div className="reservation-card">
        <div className="content-wrapper"> 
          <div className="reservation-header">
            <span className="reservation-date">{date}</span>
            <span className="reservation-time">{time}</span>
          </div>
          <div className="reservation-details">
            <p style={{marginTop: '7px'}}>전화번호: {phoneNumber}</p>
            <p style={{marginTop: '7px'}}>인원 수: {guests}</p>
            <p style={{marginTop: '7px'}}>테이블 종류: {tableType}</p>
            <div className="cancellation-info">
              <p style={{marginTop: '0px'}}>취소 가능 기간: ~ {cancellationDeadline}</p>
              <button className="cancel-button" onClick={() => onCancel(reservationId)}>cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationStatusBox