import React from 'react';
import ReservationInfoBox from './reservationStatusBox';
import ReservationStatusImage from '../../assets/reservationStatusImage.jpg'

function ReservationDisplay() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100vw',
      minHeight: '100vh'
    }}>
      <div style={{
        width: '100%',
        height: '300px',
        backgroundImage: `url(${ReservationStatusImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginBottom: '40px'
      }}></div>

      {/* 첫 번째 예약 정보 */}
      <ReservationInfoBox
        date="2025.05.20"
        time="LUNCH"
        phoneNumber="010-1234-5678"
        numberOfPeople={4}
        tableType="window"
      />

      {/* 두 번째 예약 정보 */}
      <ReservationInfoBox
        date="2025.05.20"
        time="LUNCH"
        phoneNumber="010-1234-5678"
        numberOfPeople={4}
        tableType="window"
      />
    </div>
  );
}

export default ReservationDisplay;