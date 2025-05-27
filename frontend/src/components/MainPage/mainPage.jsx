import React from 'react';
import logo from '../../assets/logoWhite.png';

const MainPage = () => {
  

  const boxStyle = {
    width: '300px',
    height: '400px',
    backgroundColor: 'rgba(234, 234, 234, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'title',
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
    backgroundColor: 'rgba(234, 234, 234, 0.85)'
  };

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const blocks = ['예약하기', '예약 확인하기'];

   return (
    <div style={{
      backgroundImage: "url('/src/assets/background1.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '100px'                // 로고와 박스 사이 여백
    }}>
      
      <img
        src={logo}
        alt="Sogo Logo"
        style={{
          height: '60px',
          objectFit: 'contain'
        }}
      />

      {/* ✅ 박스들 */}
      <div style={{
        display: 'flex',
        gap: '80px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {blocks.map((label, index) => (
          <div
            key={index}
            style={{
              ...(hoveredIndex === index ? hoverStyle : boxStyle),
              color: 'rgb(0, 0, 0)'
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;