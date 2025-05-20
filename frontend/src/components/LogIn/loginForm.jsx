import RoundedBox from './loginBackground';

function SignUp() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center', 
      color: 'gray',
      gap: '4px',
      marginTop: '12px',
      fontSize: '14px',
    }}>
    <h5>처음이신가요?</h5>
    <h5>회원가입</h5>
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
    marginTop: '12px',
    alignSelf: 'center'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
      <SignUp />
    </RoundedBox>
    </div>
  );
}

export default LoginForm;
