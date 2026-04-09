import React from 'react';
import './ThemeSelector.scss';

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const themes = [
    { id: 'premium', name: 'Premium', color: '#f59e0b' },
    { id: 'moderne', name: 'Moderne', color: '#3b82f6' },
    { id: 'rustique', name: 'Rustique', color: '#8b4513' },
    { id: 'bistro', name: 'Bistro', color: '#dc2626' },
  ];

  return (
    <div className="theme-selector-container">
      <h3>Personnaliser le Style</h3>
      <div className="theme-options">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`theme-btn ${currentTheme === theme.id ? 'active' : ''}`}
            onClick={() => onThemeChange(theme.id)}
            style={{ '--theme-color': theme.color }}
          >
            <span className="dot"></span>
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
