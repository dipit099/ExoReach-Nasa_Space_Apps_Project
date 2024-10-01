import React, { useState } from 'react';
import './Login.css'; // Create this CSS file for styling
import axios from 'axios';
import SERVER_URL from '../../config/SERVER_URL';

const Login = ({ onClose, createAccountPopupOpen }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e)  => {
    e.preventDefault();

    console.log({
      username,
      password
    })
    
    console.log('Server URL:', SERVER_URL);

    try {
      // Send the username and password to the backend
      const response = await axios.post(`${SERVER_URL}/login`, {
        username,
        password,
      });

      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error during login:', error);
    }

    onClose();
  }

  return (
    <div className="login-overlay">
      <div className="login-popup">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input 
              type="text" 
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value.trimStart())}
              onBlur={() => setUsername(username.trim())}
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
          <button className="create-account-button" on onClick={() => {onClose(); createAccountPopupOpen();}}>Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
