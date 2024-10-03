import React, { createContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(''); // New state for user_id

  // Check localStorage for login status, username, and user_id on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserId = localStorage.getItem('user_id');

    if (storedUsername && storedLoggedIn && storedUserId) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setUserId(storedUserId); // Set user_id from localStorage
    }
  }, []);


  
  // Login function to update state and localStorage
  const login = (username, id) => {
    setIsLoggedIn(true);
    setUsername(username);
    setUserId(id); // Set user_id in state
   
    localStorage.setItem('username', username);
    localStorage.setItem('user_id', id); // Save user_id to localStorage
    localStorage.setItem('isLoggedIn', 'true');
  };

  // Logout function to clear state and localStorage
  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserId(''); // Clear user_id in state
    localStorage.removeItem('username');
    localStorage.removeItem('user_id'); // Remove user_id from localStorage
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
