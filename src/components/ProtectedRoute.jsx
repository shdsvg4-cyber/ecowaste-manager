import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-navy-900">
        <div className="spinner border-4 border-cyan-400 border-t-transparent w-12 h-12"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
