import React from 'react';
import { Footer } from '../components';
import '../css/MainLayout.css';

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <div className="main-content">{children}</div>
    <Footer />
  </div>
);

export default MainLayout;
