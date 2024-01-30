// isAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AuthMiddleware = ({ element }) => {
  const { state } = useAuth();

  // Check if the user is authenticated
  if (state.isAuthenticated) {
    return element;
  } else {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }
};

export default AuthMiddleware;
