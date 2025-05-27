import React from 'react';

const MainPage = () => {
  const logoStyle = {
     width: '1000px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#ffffff', // 배경이 어두우면 흰색 글씨
    marginBottom: '40px'
  };

  const boxStyle = {
    width: '300px',
    height: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    borderRadius: '0px',
    boxShadow: '0 0 0 rgba(0,0,0,0)',
    transition: 'all 0.2s',
    cursor: 'pointer'
  };

  const hoverStyle = {
    ...boxStyle,
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  };

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const blocks = ['예약하기', '예약 확인하기'];

  return (
    <>
      <div style = {{
          backgroundImage: "url('src/assets/background1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#F2F3F7',
          display: 'flex',
          justifyContent: 'center',
          gap: '80px',
          alignItems: 'center',      /*가운데*/
          height: '100vh'      /*화면 높이 설정*/
          }}>
        {blocks.map((label, index) => (
          <div
            key={index}
            style={hoveredIndex === index ? hoverStyle : boxStyle}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {label}
          </div>
        ))}
      </div>

      <div style={logoStyle}> =
        <span>Sogo</span>
      </div>
    </>
  );
};

export default MainPage;
