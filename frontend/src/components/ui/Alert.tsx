import React from 'react';

interface AlertProps {
  type: 'success' | 'danger' | 'warning' | 'info';
  children: React.ReactNode;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, children, onClose }) => {
  return (
    <div className={`alert alert-${type} ${onClose ? 'alert-dismissible fade show' : ''}`} role="alert">
      {children}
      {onClose && (
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
      )}
    </div>
  );
};
