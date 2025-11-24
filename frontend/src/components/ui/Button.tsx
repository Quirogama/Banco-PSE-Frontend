import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  loading = false,
  children,
  disabled,
  className = '',
  ...props 
}) => {
  const cls = `btn btn-${variant} ${className}`;
  
  return (
    <button 
      className={cls} 
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      )}
      {children}
    </button>
  );
};

export default Button;
