import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';
import RegistrationForm from './pages/registrationForm';
import Dashboard from './pages/dashboard';
import EmailConfirmationPage from './components/emailConfirmationPage';
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/resetPassword';


const ProtectedRoute = ({ element }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return element;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/users/confirm/:token" element={<EmailConfirmationPage/>} />
        <Route path="/forgot-password" element = {<ForgotPassword/>}/>
        <Route path="/users/reset-password/:token" element={<ResetPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;
