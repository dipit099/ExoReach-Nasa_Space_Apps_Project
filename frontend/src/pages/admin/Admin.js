import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import SERVER_URL from '../../config/SERVER_URL'; 
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './Admin.css';

const AdminPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 

  // Handles login with server request using axios
  const handleLogin = async () => {
    try {
      console.log(username,password,SERVER_URL);
      const response = await axios.post(`${SERVER_URL}/login/admin`, {
        username: username,
        password: password,
      });

      if (response.data.success) {
        setIsAuthenticated(true);
        toast.success('Login successful!');
      } else {
        toast.error('Incorrect username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Failed to login. Please try again.');
    }
  };

  return (
    <div className="admin-page">     
      {!isAuthenticated ? (
        <div className="admin-login">
          <h2>Admin Login</h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="admin-content">
        <nav className="admin-nav">
          <Link to="/exoquiz/admin" target="_blank" rel="noopener noreferrer">ExoQuiz</Link>
          <Link to="/exoshowdown/admin" target="_blank" rel="noopener noreferrer">ExoShowdown</Link>
          <Link to="/forum/admin" target="_blank" rel="noopener noreferrer">Forum</Link>
        </nav>
      </div>
      
      )}
    </div>
  );
};

export default AdminPage;
