import React from 'react';

const Button = ({ children, className = '', variant = 'primary', ...rest }) => {
  const base = 'px-4 py-2 rounded-md font-medium';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent text-blue-600',
  };

  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
