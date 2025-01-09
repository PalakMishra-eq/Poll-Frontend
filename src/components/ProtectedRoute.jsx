import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the auth token exists

  return token ? children : <Navigate to="/" />; // Redirect to landing page if not authenticated
};

export default ProtectedRoute;
