function RoundedBox({ children }) {
    const boxStyle = {
      width: '500px',
      height: '300px',
      backgroundColor: '#DFF0FA',
      border: '2px solid black',
      borderRadius: '16px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    };
  
    return <div style={boxStyle}>{children}</div>;
  }

  export default RoundedBox;
  
  function LoginForm() {
    const rectangleStyle = {
      width: '320px',
      padding: '20px',
      backgroundColor: 'gray',
      border: '2px solid black',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    };
  
    const inputStyle = {
      height: '40px',
      border: '1px solid #000', 
      padding: '0 10px',
      fontSize: '16px',
      outline: 'none',
    };
  
    return (
      <div style={rectangleStyle}>
        <input
          type="text"
          id="username"
          placeholder="아이디 입력"
          style={inputStyle}
        />
        <input
          type="password"
          id="password"
          placeholder="비밀번호 입력"
          style={inputStyle}
        />
      </div>
    );
  }