import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logoBlack.png";

const PageLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goMain = () => {
    navigate("/login");
  };

  const pageName = () => {
    switch (location.pathname) {
      case "/signup":
        return "회원가입";
      case "/reservation":
        return "예약하기";
      case "/reservationInfo":
        return "예약하기";
      case "/reservationstatus":
        return "예약확인 및 취소";
      default:
        return "";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#F9F7F8",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={goMain}
          >
            <img
              src={logo}
              alt="로고"
              style={{ height: "40px", objectFit: "contain" }}
            />
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "#333",
              fontFamily: "title",
            }}
          >
            | {pageName()}
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        {children}
      </div>

      <div
        style={{
          backgroundColor: "#DBDBDB",
          padding: "12px 24px",
          textAlign: "center",
          fontSize: "12px",
          color: "#666",
        }}
      >
        <p>
          소공레스토랑 대표자: 홍길동 사업자번호: 00000000 통신판매업신고번호:
          0000-0000 전화번호: 02-0000-0000 주소: 서울특별시 중구 00로 00 1층
          <br />
          Copyright ©SGRestaurant All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PageLayout;
