import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import SERVER_URL from '../../config/SERVER_URL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SECRET_KEY from '../../config/SERVER_URL';


const Login = ({ onClose, createAccountPopupOpen }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const identification = localStorage.getItem('identification');
    if (identification === SECRET_KEY) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${SERVER_URL}/login`, { username, password });

      const { data } = response;

      if (data.success) {
        toast.success('Login successful!');
        localStorage.setItem('identification', data.identification);
        setIsLoggedIn(true); // Update logged-in state
      } else {
        toast.error('Login failed, please try again.');
      }

    } catch (error) {
      console.error('Error during login:', error);
    }

    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('identification');
    setIsLoggedIn(false); // Update state to logged out
    toast.info('Logged out successfully!');
  };

  return (
    <div className="login-overlay">
      <div className="login-popup">
        <button className="close-button" onClick={onClose}>×</button>
        {isLoggedIn ? (
          <>
            <h2>Welcome Back!</h2>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input 
                type="text" 
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value.trimStart())}
                required
              />
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button type="submit">Login</button>
            </form>
            <div className="signup-section">
              <p>Don't have an account?</p>
              <button className="create-account-button" onClick={() => { onClose(); createAccountPopupOpen(); }}>Create Account</button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
