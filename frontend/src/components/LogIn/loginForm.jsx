import RoundedBox from './loginBackground';
import { Link } from 'react-router-dom';

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
      />
      <input
        type="password"
        id="password"
        placeholder="비밀번호를 입력하세요"
        style={bottomInputStyle}
      />
      <button style={buttonStyle}>로그인</button>
      <SignUpButton />
    </RoundedBox>
    </div>
  );
}

export default LoginForm;
