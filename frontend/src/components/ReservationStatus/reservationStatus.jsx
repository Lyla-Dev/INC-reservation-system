import React from 'react';
import ReservationInfoBox from './reservationStatusBox';
import ReservationStatusImage from '../../assets/reservationStatusImage.jpg'

function ReservationDisplay() {
  const handleCancel = () => { // 하나의 공통 핸들러를 정의하거나, 각 박스마다 정의
    console.log("Reservation cancelled from ReservationDisplay!");
  };

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

      <ReservationInfoBox
        date="2025.05.20"
        time="DINNER"
        phoneNumber="010-1234-5678"
        guests={1}
        tableType="window"
        cancellationDeadline="25.10.04 12pm"
        onCancel={handleCancel}
      />

      <ReservationInfoBox
        date="2025.05.20"
        time="LUNCH"
        phoneNumber="010-1234-5678"
        guests={4}
        tableType="window"
        cancellationDeadline="25.10.04 12pm"
        onCancel={handleCancel}
      />

      <ReservationInfoBox
        date="2025.05.20"
        time="DINNER"
        phoneNumber="010-1234-5678"
        guests={4}
        tableType="window"
        cancellationDeadline="25.10.04 12pm"
        onCancel={handleCancel}
      />

      s<ReservationInfoBox
        date="2025.05.20"
        time="LUNCH"
        phoneNumber="010-1234-5678"
        guests={4}
        tableType="window"
        cancellationDeadline="25.10.04 12pm"
        onCancel={handleCancel}
      />
    </div>
  );
}

export default ReservationDisplay;