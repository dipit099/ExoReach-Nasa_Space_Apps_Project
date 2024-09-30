import React, { useState } from 'react';
import './Login.css'; // Create this CSS file for styling

const Login = ({ onClose, createAccountPopupOpen }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e)  => {
    e.preventDefault();

    console.log({
      username,
      password
    })

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
