import MainPage from './components/MainPage/mainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/mainPage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
