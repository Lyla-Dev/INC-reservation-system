import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logoWhite.png';

const PageLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const goMain = () => {
        navigate('/mainpage');
    };


    const pageName = () => {
    switch (location.pathname) {
      case '/signup':
        return '회원가입';
      case '/reservation':
      case '/reservationinfo':
        return '예약하기';
      case '/reservationstatus':
        return '예약확인 및 취소';
      default:
        return '';
    }
  };

  return (
    <div style = {{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
      }}>
      
      {/*상단바*/}
      <div style={{
        padding: '16px 24px', /*상단바 넓이*/
        display: 'flex',
        justifyContent: 'space-between',  /*양 끝에 붙이고 가운데 띄움*/
        alignItems: 'center', /*세로방향 중앙 정렬*/
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
            <img
              src={logo}
              alt="로고"
              style={{ height: '40px', objectFit: 'contain' }}
            />
          </div>
        

          <div style={{
            fontSize: '14px',
            color: '#333'
          }}>
            | {pageName()}
          </div>
        </div>

        <button style={{
          border: 'none',
          backgroundColor: 'transparent',
          textDecoration: 'underline',
          padding: '0',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          로그아웃
        </button>
      </div>

      {/*본문*/}
      <div style = {{
        flex: 1,
        backgroundColor: '#fff' }}>
          {children}
      </div>

      {/*하단바*/}
      <div style = {{
        backgroundColor: '#DBDBDB',
        padding: '12px 24px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#666'
      }}>
        <p>소공레스토랑   대표자: 홍길동   사업자번호: 00000000   통신판매업신고번호: 0000-0000   전화번호: 02-0000-0000   주소: 서울특별시 중구 00로 00 1층<br />
        Copyright ©SGRestaurant All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PageLayout;
