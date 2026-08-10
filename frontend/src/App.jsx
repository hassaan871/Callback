import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ActivateAccount from './pages/ActivateAccount';
import CheckEmail from './pages/CheckEmail';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

/**
 * App root component defining the client-side router navigation schemas.
 * @returns {JSX.Element} The router shell.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
