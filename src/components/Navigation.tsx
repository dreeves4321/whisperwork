import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/" className="nav__logo">
          <img 
            src={`${process.env.PUBLIC_URL}/icons/logo.svg`} 
            alt="Back to portfolio" 
            className="nav__logo-icon"
          />
        </Link>
        <div className="nav__links">
          
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Work
            </Link>
          
          
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}
            >
              About Me
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 