import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


function SignUp() {
    const navigate = useNavigate(); 

    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const [pwType, setpwType] = useState({
        type: "password",
        visible: false,
    });

    const handlePasswordType = () => {
        setpwType(prev => ({
            type: prev.visible ? "password" : "text",
            visible: !prev.visible,
        }));
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const fieldName = id === 'id' ? 'username' : id;
        setForm(prev => ({ ...prev, [fieldName]: value }));
    };

    const isFormComplete =
        form.username.trim() &&
        form.password.trim();

    const inputBaseStyle = {
        width: '100%', 
        height: '32px',
        padding: '4px 8px',
        border: '1px solid #aaa',
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box', 
    };

    const labelStyle = {
        marginBottom: '4px',
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100%',
    };

    const containerStyle = {
        width: '400px',
        margin: '0 auto',
        padding: '24px',
        border: '1px solid #aaa',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        alignItems: 'flex-start'
    };

    const handleSignUp = async () => {
        if (!isFormComplete) {
            alert('아이디와 비밀번호는 필수입니다.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: form.username,
                    password: form.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message + ' 로그인 페이지로 이동합니다.');
                navigate('/login');
            } else {
                alert(`회원가입 실패: ${data.error}`);
            }
        } catch (error) {
            console.error('회원가입 요청 중 오류 발생:', error);
            alert('회원가입 처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '24px' }}>회원가입</h2>
            <div style={containerStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <label htmlFor="id" style={labelStyle}>아이디</label>
                    <input
                        type="text"
                        id="id"
                        value={form.username}
                        onChange={handleInputChange}
                        style={inputBaseStyle}
                        onFocus={(e) => (e.target.style.background = '#DFF0FA')}
                        onBlur={(e) => (e.target.style.background = '')}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <label htmlFor="password" style={labelStyle}>비밀번호</label>
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
                        marginTop: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'
                    }}>
                        <input
                            type="checkbox"
                            checked={pwType.visible}
                            onChange={handlePasswordType}
                            id="showPassword" 
                        />
                        <label htmlFor="showPassword" style={{ marginLeft: '8px', marginBottom: '0px' }}>
                            {"비밀번호 보기"}
                        </label>
                    </div>
                </div>
            </div>

            <button
                disabled={!isFormComplete}
                onClick={handleSignUp}
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