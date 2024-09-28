import React from 'react';
import './Login.css'; // Create this CSS file for styling

const Login = ({ onClose }) => {
  return (
    <div className="login-overlay">
      <div className="login-popup">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <div className="signup-section">
          <p>Don't have an account?</p>
          <button className="create-account-button">Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
