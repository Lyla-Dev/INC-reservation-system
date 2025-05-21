import React, { useState } from 'react';

function SignUp() {

    const [form, setForm] = useState({
        id: '',
        password: ''
      });

      const [pwType, setpwType] = useState({
        type: "password",
        visible: false,
      })

      const handlePasswordType = () => {
        setpwType(() => {
          if (!pwType.visible) {
            return { type: "text", visible: true };
    
          } else {
            return { type: "password", visible: false };
          }
        });
      };

      const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });
      };
    
      const isFormComplete =
        form.id.trim() &&
        form.password.trim();
    
      const inputBaseStyle = {
        height: '32px',
        padding: '4px 8px',
        border: '1px solid #aaa',
        fontSize: '14px',
        outline: 'none',
      };

      const labelStyle = {
        marginBottom: '10px',
        fontWeight: 'bold',
      };
    
      const containerStyle = {
        width: '400px',
        margin: '0 auto',
        padding: '24px',
        border: '1px solid #aaa',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '24px' }}>회원가입</h2>
      <div style={containerStyle}>
        <div style={{ marginBottom: '30px',  display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
        <label style={labelStyle}>아이디</label>
          <input
            type="text"
            id="id"
            value={form.id}
            onChange={handleInputChange}
            style={{
              ...inputBaseStyle
            }}
            onFocus={(e) => (e.target.style.background = '#DFF0FA')}
            onBlur={(e) => (e.target.style.background = '')}
          />
        </div>

        <div style={{  marginBottom: '30px', display: 'flex', flexDirection: 'column' , alignItems: 'start'}}>
          <label style={labelStyle}>비밀번호</label>
          <input
            type={pwType.type}
            id="password"
            value={form.password}
            onChange={handleInputChange}
            style={inputBaseStyle}
            onFocus={(e) => (e.target.style.background = '#DFF0FA')}
            onBlur={(e) => (e.target.style.background = '')}
          />
            <div style={{
                marginTop: '10px', display: 'flex', flexDirection: 'row', alignItems: 'start'}}>
          <input
            type="checkbox"
            checked={pwType.visible}
            onChange={handlePasswordType}
            />
            <label style={{ marginLeft: '8px' }}>
                {"비밀번호 보기"}
            </label>
            </div>
            </div>
             </div>

      <button
        disabled={!isFormComplete}
        style={{
          marginTop: '24px',
          padding: '8px 16px',
          border: '0px solid #aaa',
          backgroundColor: isFormComplete ? '#DFF0FA' : '#e0e0e0',
          color: isFormComplete ? '#000' : '#777',
          cursor: isFormComplete ? 'pointer' : 'not-allowed',
          fontSize: '14px'
        }}
      >
        완료
      </button>
    </div>
  );
}

export default SignUp;