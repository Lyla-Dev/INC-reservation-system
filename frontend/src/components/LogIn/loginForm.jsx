import RoundedBox from './loginBackground';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import MainPage from '../MainPage/mainPage';
function SignUpButton() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'black',
      gap: '30px',
      marginTop: '12px',
    }}>
    <span style={{ 
      fontSize: '12px', 
      fontWeight: 'bold',
      color: 'gray'
      }}>처음이신가요?</span>
    <Link to="/signup" style={{ fontWeight: 'bold', color: 'gray', textDecoration: 'underline', fontSize: '12px'}}>
        회원가입하기
      </Link>
  </div>
  );
}

function LoginForm() {
  const [username, setUsername] = useState(''); // 아이디 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const navigate = useNavigate(); // 라우팅을 위한 useNavigate 훅

  const topInputStyle = {
    width: '400px',
    height: '50px',
    backgroundColor: 'lightgray',
    color: 'black',
    borderTop: '2px solid black',
    borderLeft: '2px solid black',
    borderRight: '2px solid black',
    borderBottom: 'none',
    padding: '0 12px',
    fontSize: '16px',
    outline: 'none',
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    alignSelf: 'center'
  };

  const bottomInputStyle = {
    width: '400px',
    height: '50px',
    backgroundColor: 'lightgray',
    color: 'black',
    border: '2px solid black',
    padding: '0 12px',
    fontSize: '16px',
    outline: 'none',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    alignSelf: 'center'
  };

  const buttonStyle = {
    width: '120px',
    height: '40px',
    backgroundColor: 'lightgray', 
    color: 'black',
    border: '2px solid black',
    borderRadius: '0px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '40px',
    alignSelf: 'center'
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/login', { // 백엔드 로그인 API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // "로그인 성공!"
        // 로그인 성공 시 메인 페이지나 대시보드로 이동
        // TODO: 이동할 경로 작성
        navigate('/MainPage'); // 예시: '/dashboard' 경로로 이동
      } else {
        alert(`로그인 실패: ${data.error}`);
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      alert('로그인 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      alignItems: 'center'
      }}>
    <RoundedBox>
      <input
        type="text"
        id="username"
        placeholder="아이디를 입력하세요"
        style={topInputStyle}
        value={username}
        onChange={(e) => setUsername(e.target.value)} // 입력 값 상태 업데이트
      />
      <input
        type="password"
        id="password"
        placeholder="비밀번호를 입력하세요"
        style={bottomInputStyle}
        value={password}
        onChange={(e) => setPassword(e.target.value)} // 입력 값 상태 업데이트
      />
      <button style={buttonStyle} onClick={handleLogin}>로그인</button>
      <SignUpButton />
    </RoundedBox>
    </div>
  );
}

export default LoginForm;
