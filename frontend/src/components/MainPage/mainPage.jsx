import React from 'react';

const MainPage = () => {
  const boxStyle = {
    width: '300px',
    height: '300px',
    backgroundColor: '#e0f0ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 0 rgba(0,0,0,0)',
    transition: 'all 0.2s',
    cursor: 'pointer'
  };

  const hoverStyle = {
    ...boxStyle,
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    backgroundColor: ' rgba(78, 145, 239, 0.72)'
  };

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const blocks = ['예약하기', '예약 확인하기'];

  return (
    <div style = {{
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
  );
};

export default MainPage;
