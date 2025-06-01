import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReservationInfoBox from "./reservationStatusBox";
import ReservationStatusImage from "../../assets/reservationStatusImage.jpg";
import CancelConfirmPopup from "../Popup/cancelConfirmPopup";
import CancelSuccessPopup from "../Popup/cancelSuccessPopup";
import CancelFailPopup from "../Popup/cancelFailPopup";

const formatDateToDisplay = (dateString) => {
  if (!dateString) return "";
  return dateString.replace(/-/g, ".");
};

function ReservationStatus() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // 취소 확인 팝업 표시 여부
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // 취소 성공 팝업 표시 여부
  const [showFailPopup, setShowFailPopup] = useState(false);
  const [targetReservationId, setTargetReservationId] = useState(null); // 취소 대상 예약 ID

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/reservations/my_reservations",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.status === 401) {
          alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
          navigate("/login");
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "예약 정보를 불러오는 데 실패했습니다."
          );
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

  const handleRequestCancel = (reservationId) => {
    setTargetReservationId(reservationId); // 취소할 예약 ID 저장
    setShowConfirmPopup(true); // 확인 팝업 열기
  };

  const handleCancelConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/reservations/reservations/${targetReservationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "예약 취소에 실패했습니다.");
      }

      setReservations(
        (prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation.id !== targetReservationId
          )
      );
      setShowConfirmPopup(false); // 확인 팝업 닫기
      setShowSuccessPopup(true); // 성공 팝업 열기
    } catch (err) {
      console.error("예약 취소 중 에러 발생:", err);
      alert(`예약 취소 실패: ${err.message}`);
      setShowConfirmPopup(false); // 실패 시에도 확인 팝업 닫기
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F9F7F8",
          width: "100vw",
          minHeight: "100vh",
          fontSize: "20px",
        }}
      >
        예약 정보를 불러오는 중...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F9F7F8",
          width: "100vw",
          minHeight: "100vh",
          color: "red",
          fontSize: "20px",
        }}
      >
        오류 발생: {error}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F9F7F8",
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "300px",
          backgroundImage: `url(${ReservationStatusImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginBottom: "40px",
        }}
      ></div>

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
            onCancel={() => handleRequestCancel(reservation.id)}
          />
        ))
      ) : (
        <p style={{ fontFamily: "content", fontSize: "18px", color: "gray" }}>
          현재 예약 내역이 없습니다.
        </p>
      )}

      {/* 예약 취소 확인 팝업 */}
      {showConfirmPopup && (
        <CancelConfirmPopup
          onConfirm={handleCancelConfirm}
          onCancel={() => setShowConfirmPopup(false)}
        />
      )}

      {/* 예약 취소 성공 팝업 */}
      {showSuccessPopup && <CancelSuccessPopup />}

      {showFailPopup && <CancelFailPopup />}
    </div>
  );
}

export default ReservationStatus;
