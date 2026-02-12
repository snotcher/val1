import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToFeatures = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('features');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      const el = document.getElementById('features');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav">
      <div className="brand">
        <Link to="/">Garage.bio</Link>
      </div>

      <div className="nav-center">
        <Link to="/" className={isActive('/') ? 'nav-item active' : 'nav-item'}>Home</Link>
        <a href="/#features" onClick={goToFeatures} className="nav-item">Features</a>
        <Link to="/themes" className="nav-item">Themes / Showcase</Link>
        <Link to="/pricing" className="nav-item">Pricing</Link>
        <Link to="/faq" className="nav-item">FAQ</Link>
      </div>

      <div className="nav-right">
        <Link to="/create" className="get-started">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navbar;
