
// import MainPage from './components/MainPage/mainPage';
// import PageLayout from './components/PageLayout/pageLayout';
// import SignUp from './components/SignUp/signUp';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LogIn from './components/LogIn/logIn'
import './App.css';

function App() {
  return (
    <div>
      {/* 폰트 사용 예시 */}
      <p style={{fontFamily: 'title', fontSize: '30px'}}>안녕하세요, 돋움(로고/제목) 폰트입니다!</p>
      <p style={{fontFamily: 'content'}}>안녕하세요, 바탕체(본문 내용) 폰트입니다!</p>

    {/* <Router>
      <Routes>
        <Route path="/mainPage" element={<MainPage />} />
      </Routes>
    </Router> */}
    </div>
  );
}

export default App;
