import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create Auth Context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('ecowaste_user');
    const storedToken = localStorage.getItem('ecowaste_token');
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse stored user:', err);
        localStorage.removeItem('ecowaste_user');
        localStorage.removeItem('ecowaste_token');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Mock login for now
      const mockUser = {
        id: 'user_1',
        email,
        name: email.split('@')[0],
        role: 'manager',
        unit: 'Matriz'
      };
      
      setUser(mockUser);
      localStorage.setItem('ecowaste_user', JSON.stringify(mockUser));
      localStorage.setItem('ecowaste_token', 'mock_token_' + Date.now());
      
      return mockUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ecowaste_user');
    localStorage.removeItem('ecowaste_token');
  }, []);

  const signup = useCallback(async (email, password, name) => {
    setLoading(true);
    setError(null);
    try {
      const mockUser = {
        id: 'user_' + Date.now(),
        email,
        name,
        role: 'operator',
        unit: 'Matriz'
      };
      
      setUser(mockUser);
      localStorage.setItem('ecowaste_user', JSON.stringify(mockUser));
      localStorage.setItem('ecowaste_token', 'mock_token_' + Date.now());
      
      return mockUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    signup,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
