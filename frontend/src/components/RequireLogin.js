import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const RequireLogin = ({ children }) => {
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    if (!user_id) {
      alert("Please Login or SignUp first");
    }
  }, [user_id]);

  return user_id ? children : <Navigate to="/" />;
};

export default RequireLogin;
