// import React from 'react';
// import './ReservationStatus.css'; 

// const ReservationStatusBox = ({ date, time, phoneNumber, guests, tableType, cancellationDeadline, onCancel }) => {
//   return (
//     <div className="reservation-card-container">
//       <div className="reservation-card">
//         <div className="reservation-header">
//           <span className="reservation-date">{date}</span>
//           <span className="reservation-time">{time}</span>
//         </div>
//         <div className="reservation-details">
//           <p style={{marginTop: '7px'}}>전화번호: {phoneNumber}</p>
//           <p style={{marginTop: '7px'}}>인원 수: {guests}</p>
//           <p style={{marginTop: '7px'}}>테이블 종류: {tableType}</p>
//           <div className="cancellation-info">
//             <p style={{marginTop: '7px'}}>취소 가능 기간: ~ {cancellationDeadline}</p>
//             <button className="cancel-button" onClick={onCancel}>cancel</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const handleCancelLunch = () => {
//     console.log("Lunch reservation cancelled!");
//     // Add your cancellation logic here (e.g., API call)
//   };

//   const handleCancelDinner = () => {
//     console.log("Dinner reservation cancelled!");
//     // Add your cancellation logic here (e.g., API call)
//   };

//   return (
//     <div className="app-container">
//       <ReservationStatusBox
//         date="2025.05.20"
//         time="LUNCH"
//         phoneNumber="010-1234-5678"
//         guests={4}
//         tableType="window"
//         cancellationDeadline="25.10.04 12pm"
//         onCancel={handleCancelLunch}
//       />
//       <ReservationStatusBox
//         date="2025.05.20"
//         time="DINNER"
//         phoneNumber="010-1234-5678"
//         guests={4}
//         tableType="window"
//         cancellationDeadline="25.10.04 12pm"
//         onCancel={handleCancelDinner}
//       />
//     </div>
//   );
// };

// export default App;

import React from 'react';
import './ReservationStatus.css'; 

const ReservationStatusBox = ({ date, time, phoneNumber, guests, tableType, cancellationDeadline, onCancel }) => {
  return (
    <div className="reservation-card-container">
      <div className="reservation-card">
        {/* 새로운 래퍼 요소 추가 */}
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
              <button className="cancel-button" onClick={onCancel}>cancel</button>
            </div>
          </div>
        </div> {/* content-wrapper 끝 */}
      </div>
    </div>
  );
};

// App 컴포넌트는 변경 없음
const App = () => {
  const handleCancelLunch = () => {
    console.log("Lunch reservation cancelled!");
  };

  const handleCancelDinner = () => {
    console.log("Dinner reservation cancelled!");
  };

  return (
    <div className="app-container">
      <ReservationStatusBox
        date="2025.05.20"
        time="LUNCH"
        phoneNumber="010-1234-5678"
        guests={4}
        tableType="window"
        cancellationDeadline="25.10.04 12pm"
        onCancel={handleCancelLunch}
      />
      <ReservationStatusBox
        date="2025.05.20"
        time="DINNER"
        phoneNumber="010-1234-5678"
        guests={4}
        tableType="window"
        cancellationDeadline="25.10.04 12pm"
        onCancel={handleCancelDinner}
      />
    </div>
  );
};

export default App;