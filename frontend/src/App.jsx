// 🚨🚨 
// 이제부터는 회원가입~로그인~메인페이지까지의 경로를 테스트할 수 있습니다.
// 앞으로 개발하실 때는 push 하기 전에 기존에 남아있던 코드만 남겨놓고 테스트 코드는 모두 지워주세요!
// 여기에 앞으로 추가될 내용은 경로 설정만 있습니다!
// 🚨🚨 

import MainPage from './components/MainPage/mainPage';
import SignUp from './components/SignUp/signUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn/logIn'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} /> 
        <Route path="/signup" element={<SignUp />} />
        <Route path="/MainPage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;