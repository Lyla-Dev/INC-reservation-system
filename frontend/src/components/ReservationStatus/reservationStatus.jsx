import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationInfoBox from './reservationStatusBox';
import ReservationStatusImage from '../../assets/reservationStatusImage.jpg'

const formatDateToDisplay = (dateString) => {
  if (!dateString) return '';
  return dateString.replace(/-/g, '.');
};

function ReservationDisplay() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:5000/reservations/my_reservations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (response.status === 401) {
          alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
          navigate('/login');
          return; 
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '예약 정보를 불러오는 데 실패했습니다.');
        }

        const data = await response.json();
        setReservations(data);
      } catch (err) {
        console.error("예약 정보를 불러오는 중 에러 발생:", err);
        setError(err.message); 
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleCancel = async (reservationId) => {
    if (!window.confirm("정말로 이 예약을 취소하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/reservations/reservations/${reservationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '예약 취소에 실패했습니다.');
      }

      alert("예약이 성공적으로 취소되었습니다.");
      setReservations(prevReservations =>
        prevReservations.filter(reservation => reservation.id !== reservationId) // 실제 예약 객체에 id가 있어야 함
      );
    } catch (err) {
      console.error("예약 취소 중 에러 발생:", err);
      alert(`예약 취소 실패: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#F9F7F8', width: '100vw', minHeight: '100vh', fontSize: '20px'
      }}>
        예약 정보를 불러오는 중...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#F9F7F8', width: '100vw', minHeight: '100vh', color: 'red', fontSize: '20px'
      }}>
        오류 발생: {error}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#F9F7F8',
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

      {reservations.length > 0 ? (
        reservations.map((reservation, index) => (
          <ReservationInfoBox
            key={index}
            date={formatDateToDisplay(reservation.date)}
            time={reservation.time}
            phoneNumber={reservation.phoneNumber}
            guests={reservation.guests}
            tableType={reservation.tableType}
            cancellationDeadline={reservation.cancellationDeadline}
            onCancel={() => handleCancel(reservation.id)}
          />
        ))
      ) : (
        <p style={{ fontFamily: 'content', fontSize: '18px', color: 'gray' }}>현재 예약 내역이 없습니다.</p>
      )}
    </div>
  );
}

export default ReservationDisplay;