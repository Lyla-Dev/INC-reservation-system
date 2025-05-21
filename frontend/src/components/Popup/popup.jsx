import React from 'react';

const Popup = () => {
  return (
    <div style = {{     /*팝업창 전체적인 틀*/
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      border: '1px solid #aaa',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      padding: '24px',
      borderRadius: '8px',
      zIndex: 1000,
      minWidth: '300px',
      textAlign: 'center'
    }}>
      <p style = {{
        fontWeight: 'bold',
        marginBottom: '16px' }}
        >
        회원가입이 완료되었습니다.
      </p>

      <div style = {{
        border: '1px solid #ccc',
        padding: '16px',
        marginBottom: '20px',
        textAlign: 'left'
      }}>
        <p><strong>[회원정보]</strong></p>
        <p>ID : 1234</p>
        <p>Password : 1234</p>
      </div>

      <button style = {{
        padding: '6px 16px',
        border: '1px solid #999',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
      >
        닫기
      </button>
    </div>
  );
};

export default Popup;