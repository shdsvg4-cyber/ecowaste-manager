import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../hooks';

const NotificationItem = ({ notification }) => {
  const { removeNotification } = useApp();
  
  const getStyles = () => {
    const base = 'flex items-center gap-3 p-4 rounded-lg shadow-lg';
    switch (notification.type) {
      case 'success':
        return `${base} bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700`;
      case 'error':
        return `${base} bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700`;
      case 'warning':
        return `${base} bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700`;
      case 'info':
      default:
        return `${base} bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700`;
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle size={20} className="flex-shrink-0" />;
      case 'error':
        return <AlertCircle size={20} className="flex-shrink-0" />;
      case 'warning':
        return <AlertCircle size={20} className="flex-shrink-0" />;
      case 'info':
      default:
        return <Info size={20} className="flex-shrink-0" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={getStyles()}
    >
      {getIcon()}
      <div className="flex-1">
        <p className="font-medium">{notification.message}</p>
      </div>
      <button
        onClick={() => removeNotification(notification.id)}
        className="text-current hover:opacity-70 transition-opacity"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};

export function NotificationContainer() {
  const { notifications } = useApp();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
      {notifications.map(notification => (
        <div key={notification.id} className="pointer-events-auto">
          <NotificationItem notification={notification} />
        </div>
      ))}
    </div>
  );
}

export default NotificationContainer;
