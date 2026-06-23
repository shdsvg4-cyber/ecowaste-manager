import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

export function useNotification() {
  const { addNotification, removeNotification } = useApp();
  
  return {
    success: (message, duration = 3000) =>
      addNotification({ type: 'success', message, duration }),
    error: (message, duration = 5000) =>
      addNotification({ type: 'error', message, duration }),
    info: (message, duration = 3000) =>
      addNotification({ type: 'info', message, duration }),
    warning: (message, duration = 4000) =>
      addNotification({ type: 'warning', message, duration }),
    remove: removeNotification
  };
}

export default {
  useAuth,
  useApp,
  useNotification
};
