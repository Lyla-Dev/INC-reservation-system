import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PageLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const goMain = () => {
        navigate('/');
    };


    const pageName = () => {
    switch (location.pathname) {
      case '/signUp':
        return '회원가입';
      case '/reservation':
      case '/reservationInfo':
        return '예약하기';
      case '/reservationStatus':
        return '예약확인 및 취소';
      default:
        return '';
    }
  };

  return (
    <div style={{
      backgroundColor: '#DFF0FA',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      {/* 로고 + 현재 페이지 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          cursor: 'pointer',
        }} onClick={goMain}>
          로고
        </div>

        <div style={{
          fontSize: '14px',
          color: '#333'
        }}>
          | {pageName()}
        </div>
      </div>

      <button style={{
        border: '1px solid #aaa',
        backgroundColor: 'white',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        로그아웃
      </button>
    </div>
  );
};

export default PageLayout;
