
import MainPage from './components/MainPage/mainPage';
import PageLayout from './components/PageLayout/pageLayout';
import SignUp from './components/SignUp/signUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn/logIn'
import ReservationInfo from './components/ReservationInfo/reservationInfo';
// import Reservation from './components/Reservation/reservation';
// import ReservationStatus from './components/ReservationStatus/reservationStatus';
// import MainPage from './components/MainPage/mainPage';
// import PageLayout from './components/PageLayout/pageLayout';
// import SignUp from './components/SignUp/signUp';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LogIn from './components/LogIn/logIn'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/mainpage" element={<PageLayout><MainPage /></PageLayout>} />
          <Route path="/signup" element={<PageLayout><SignUp /></PageLayout>} />
          <Route path="/reservationinfo" element={<PageLayout><ReservationInfo /></PageLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
