import React, { useState } from 'react';
import AdminExoQuiz from './AdminExoQuiz';
import AdminExoShowdown from './AdminExoShowdown';
import SERVER_URL from '../../config/SERVER_URL'; // Ensure SERVER_URL is correctly configured
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './Admin.css'; // Ensure correct CSS file is imported

const AdminPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState(''); // Manage which content to display

  // Handles login with server request using axios
  const handleLogin = async () => {

    setIsAuthenticated(true); // Remove this line after testing

    console.log(username, password);

    try {
      const response = await axios.post(`${SERVER_URL}/admin`, {
        username: username,
        password: password,
      });

      console.log('Server response:', response.data); // Log response from server

      if (response.data.success) {
        // Authentication successful
        setIsAuthenticated(true);
        toast.success('Login successful!'); // Success Toast
        console.log('Authentication successful');
      } else {
        // Show error message from server response
        toast.error(response.data.message || 'Incorrect username or password'); // Error Toast
        console.log('Authentication failed:', response.data.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error logging in:', error);
      toast.error('Failed to login. Please try again.'); // Error Toast
    }
  };

  // Handles tab switching
  const handleTabClick = (tab) => {
    console.log('Tab clicked:', tab); // Log tab click
    toast.info(`Switched to ${tab} tab`); // Info Toast for switching tabs
    setActiveTab(tab);
  };

  return (
    <div className="admin-page">
      <ToastContainer /> {/* This is required to display toasts */}
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
            <button onClick={() => handleTabClick('exoquiz')}>ExoQuiz</button>
            <button onClick={() => handleTabClick('exoshowdown')}>ExoShowdown</button>
            <button onClick={() => handleTabClick('forum')}>Forum</button>
          </nav>
          <div className="admin-panel">
            {activeTab === 'exoquiz' && (
              <div className="admin-section">
                <h2>ExoQuiz</h2>
                <AdminExoQuiz />
              </div>
            )}
            {activeTab === 'exoshowdown' && (
              <div className="admin-section">
                <h2>ExoShowdown</h2>
                <AdminExoShowdown />
              </div>
            )}
            {activeTab === 'forum' && (
              <div className="admin-section">
                <h2>Forum</h2>
                <p>This is the Forum content.</p>
                {/* Add your Forum functionality here */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
