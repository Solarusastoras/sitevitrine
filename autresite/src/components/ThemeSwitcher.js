import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeSwitcher.scss';

const THEMES = [
  { id: 'minimaliste', name: 'Minimaliste', icon: '◻️' },
  { id: 'luxe', name: 'Premium Luxe', icon: '✨' },
  { id: 'urbain', name: 'Urbain Dark', icon: '🏙️' },
  { id: 'eco', name: 'Éco Nature', icon: '🌿' },
  { id: 'vintage', name: 'Rétro Vintage', icon: '📻' },
];

export default function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`theme-switcher ${isOpen ? 'open' : ''}`}>
      <button 
        className="ts-toggle-btn" 
        onClick={() => setIsOpen(!isOpen)}
        title="Changer le style de la maquette"
      >
        🎨 Thèmes
      </button>
      
      <div className="ts-panel">
        <div className="ts-header">
          <h3>Sélecteur de Maquette</h3>
          <p>Testez les différentes ambiances</p>
        </div>
        <div className="ts-list">
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={`ts-option ${theme === t.id ? 'active' : ''}`}
              onClick={() => {
                changeTheme(t.id);
                setIsOpen(false);
              }}
            >
              <span className="ts-icon">{t.icon}</span>
              <span className="ts-name">{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
