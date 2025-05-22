import PageLayout from './components/PageLayout/pageLayout';
import SignUp from './components/SignUp/signUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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