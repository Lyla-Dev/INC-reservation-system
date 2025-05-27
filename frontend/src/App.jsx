
import MainPage from './components/MainPage/mainPage';
import PageLayout from './components/PageLayout/pageLayout';
import SignUp from './components/SignUp/signUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn/logIn'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/mainpage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
