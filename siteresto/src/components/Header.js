import React, { useState } from 'react';
import './Header.scss';

const Header = ({ user, onLogout, onToggleLogin, currentTheme, onThemeChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const themes = ['premium', 'classique', 'moderne', 'rustique', 'bistro'];
  
  const cycleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    onThemeChange(themes[nextIndex]);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={`header ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container header-content">
        <div className="logo">
          <h1>RESTO<span>.</span></h1>
        </div>
        
        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${menuOpen ? 'mobile-active' : ''}`}>
          <ul>
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Accueil</a></li>
            <li><a href="#menu" onClick={() => setMenuOpen(false)}>Carte</a></li>
            {user && <li><a href="#add" onClick={() => setMenuOpen(false)}>Ajouter</a></li>}
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="theme-btn" onClick={cycleTheme} title="Changer de style">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10V9H7v2zm0 4h10v-2H7v2z" />
            </svg>
          </button>
          {user ? (
            <button className="auth-btn logout" onClick={onLogout}>Déconnexion</button>
          ) : (
            <button className="auth-btn login" onClick={onToggleLogin}>Admin</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
