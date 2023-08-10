import logo from './logo.svg';
import './App.css';
import { Eestimator } from './Estimator';
import { useState } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import ImportPage from './ImportPage';
import PasswordPage from './PasswordPage';

function App() {
  const [passwordVerified, setPasswordVerified] = useState(false);

  return (
    <Routes>
      <Route path="/password" element={passwordVerified ? <Link to="/import" /> : <PasswordPage setPasswordVerified={setPasswordVerified} />} />
      <Route path="/import" element={passwordVerified ? <ImportPage passwordVerified={passwordVerified}/> : <PasswordPage setPasswordVerified={setPasswordVerified} />} />
      <Route path='/' element={<Eestimator />} />
    </Routes>
  );
}

export default App;
