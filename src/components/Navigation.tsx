import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsHidden(true);
      } else {
        // Scrolling up
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`nav ${isHidden ? 'nav__hidden' : ''}`}>
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