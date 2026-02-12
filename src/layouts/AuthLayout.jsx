import React from 'react';
import '../css/AuthLayout.css';

const AuthLayout = ({ children }) => (
  <div className="auth-root">
    <div className="auth-inner">{children}</div>
  </div>
);

export default AuthLayout;
