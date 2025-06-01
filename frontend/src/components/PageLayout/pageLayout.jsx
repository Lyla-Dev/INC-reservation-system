import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logoBlack.png";

const PageLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const goMain = () => {
    if (isLoggedIn) {
      navigate("/mainpage");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    if (!window.confirm("정말로 로그아웃하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(`로그아웃 실패: ${errorData.error || "알 수 없는 오류 발생"}`);
      }
    } catch (error) {
      console.error("로그아웃 요청 중 오류 발생:", error);
      alert("로그아웃 처리 중 오류가 발생했습니다.");
    }
  };

  const pageName = () => {
    switch (location.pathname) {
      case "/signup":
        return "회원가입";
      case "/reservation":
      case "/reservationInfo":
        return "예약하기";
      case "/reservationStatus":
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

        {isLoggedIn && (
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              textDecoration: "underline",
              padding: "0",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "title",
            }}
            onClick={handleLogout}
          >
            로그아웃
          </button>
        )}
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "#F9F7F8",
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
