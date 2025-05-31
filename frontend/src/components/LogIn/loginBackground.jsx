function RoundedBox({ children }) {
    const boxStyle = {
      width: '500px',
      height: '300px',
      backgroundColor: 'white',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    };
  
    return <div style={boxStyle}>{children}</div>;
  }

  export default RoundedBox;