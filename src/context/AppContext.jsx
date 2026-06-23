import React, { createContext, useState, useCallback } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('ecowaste_theme');
    return stored || 'light';
  });

  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem('ecowaste_language');
    return stored || 'pt-BR';
  });

  const [notifications, setNotifications] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('ecowaste_theme', newTheme);
      
      // Update document class for Tailwind dark mode
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newTheme;
    });
  }, []);

  const setLanguageCode = useCallback((lang) => {
    setLanguage(lang);
    localStorage.setItem('ecowaste_language', lang);
  }, []);

  const addNotification = useCallback((notification) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id };
    setNotifications(prev => [newNotification, ...prev]);
    
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 3000);
    }
    
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const value = {
    theme,
    toggleTheme,
    language,
    setLanguage: setLanguageCode,
    notifications,
    addNotification,
    removeNotification,
    sidebarOpen,
    setSidebarOpen
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
