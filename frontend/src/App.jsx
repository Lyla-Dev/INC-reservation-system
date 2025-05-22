
import PageLayout from './components/PageLayout/pageLayout';
import SignUp from './components/SignUp/signUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn/logIn'
import SignUp from './components/SignUp/signUp'; // 회원가입 페이지 컴포넌트 (이름은 임의로 지정)

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route path="signUp" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;