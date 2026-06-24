import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

// Helper: Generate secure temporary password
const generateTempPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pwd = '';
  for (let i = 0; i < 8; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
};

// Helper: Hash password (basic - for demo, use proper bcrypt in production)
const hashPassword = (pwd) => {
  return btoa(pwd); // Base64 encoding for demo
};

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

  // Admin login
  const adminLogin = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Admin credentials stored in localStorage (in production, use secure backend)
      const storedAdmins = JSON.parse(localStorage.getItem('ecowaste_admins') || '[]');
      const admin = storedAdmins.find(a => a.email === email && a.passwordHash === hashPassword(password));
      
      if (!admin) {
        throw new Error('Email ou senha inválido');
      }

      const adminUser = {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: 'admin',
        isAdmin: true
      };
      
      setUser(adminUser);
      localStorage.setItem('ecowaste_user', JSON.stringify(adminUser));
      localStorage.setItem('ecowaste_token', 'admin_token_' + Date.now());
      
      return adminUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Student login
  const studentLogin = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const storedStudents = JSON.parse(localStorage.getItem('ecowaste_students') || '[]');
      const student = storedStudents.find(
        s => s.email === email && 
            s.passwordHash === hashPassword(password) && 
            s.status === 'approved'
      );
      
      if (!student) {
        throw new Error('Email ou senha inválido. Sua conta pode estar pendente de aprovação.');
      }

      const studentUser = {
        id: student.id,
        email: student.email,
        name: student.name,
        classroom: student.classroom,
        role: 'student',
        isAdmin: false,
        registrationDate: student.registrationDate
      };
      
      setUser(studentUser);
      localStorage.setItem('ecowaste_user', JSON.stringify(studentUser));
      localStorage.setItem('ecowaste_token', 'student_token_' + Date.now());
      
      return studentUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Student registration (creates pending request)
  const registerStudent = useCallback(async (email, name, classroom) => {
    setLoading(true);
    setError(null);
    try {
      const storedRequests = JSON.parse(localStorage.getItem('ecowaste_registration_requests') || '[]');
      
      // Check if student already registered
      if (storedRequests.some(r => r.email === email)) {
        throw new Error('Este email já foi registrado. Aguarde aprovação do administrador.');
      }

      const tempPassword = generateTempPassword();
      const request = {
        id: 'req_' + Date.now(),
        email,
        name,
        classroom,
        tempPassword,
        status: 'pending',
        createdAt: new Date().toISOString(),
        approvedAt: null
      };

      storedRequests.push(request);
      localStorage.setItem('ecowaste_registration_requests', JSON.stringify(storedRequests));

      return {
        success: true,
        message: 'Registro enviado para aprovação!',
        tempPassword,
        email
      };
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

  const value = {
    user,
    loading,
    error,
    adminLogin,
    studentLogin,
    registerStudent,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
