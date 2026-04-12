import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, X, Settings, LogIn, LogOut, Heart } from 'lucide-react';

export default function Header({ onShowAdmin, onAdd, onManage, isAdding, isEditing }) {
  const {
    currentStyle, setCurrentStyle,
    isClientConnected, handleLogout,
    siteData, isRestaurant,
    favorites, setIsFavoritesModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const styleNames = isRestaurant
    ? ["Premium", "Classique", "Moderne", "Rustique", "Bistro"]
    : ["Luxe", "Vintage", "Minimal", "Moderne", "Eco"];

  const getHeaderStyles = () => {
    switch (currentStyle) {
      case 1: return { bg: 'rgba(10, 10, 10, 0.98)', text: '#fff', accent: '#c5a059', l1Border: '1px solid rgba(197, 160, 89, 0.2)', btnBg: '#c5a059', btnText: '#000' };
      case 2: return { bg: 'rgba(252, 245, 230, 0.98)', text: '#3d2b1f', accent: '#8b5a2b', l1Border: '2px solid #3d2b1f', btnBg: '#3d2b1f', btnText: '#fff' };
      case 3: return { bg: 'rgba(255, 255, 255, 0.98)', text: '#000', accent: '#000', l1Border: '1px solid #000', btnBg: '#000', btnText: '#fff' };
      case 4: return { bg: 'rgba(15, 15, 15, 0.98)', text: '#fff', accent: '#fff', l1Border: '2px solid #fff', btnBg: '#fff', btnText: '#000' };
      case 5: return { bg: 'rgba(240, 244, 238, 0.98)', text: '#2d5a27', accent: '#2d5a27', l1Border: '1px solid rgba(45, 90, 39, 0.4)', btnBg: '#2d5a27', btnText: '#fff' };
      default: return { bg: '#fff', text: '#000', accent: '#000', l1Border: '1px solid #eee', btnBg: '#111', btnText: '#fff' };
    }
  };

  const h = getHeaderStyles();

  return (
    <header className="permanent-header" style={{
      background: h.bg,
      borderBottom: `1px solid ${h.border || 'transparent'}`,
      color: h.text
    }}>
      {/* LIGNE 1: ADMIN - STYLES */}
      <div className="header-l1" style={{ borderBottom: h.l1Border }}>
        <div className="left-side">
          <button onClick={onShowAdmin} className={`admin-toggle ${h.bg.includes('10') || h.bg.includes('15') ? 'inverted' : ''}`}>
            <Settings size={20} />
          </button>
        </div>

        <div className="universe-selector desktop-only" style={{ background: h.bg.includes('10') || h.bg.includes('15') ? 'rgba(255,255,255,0.1)' : '#f5f5f5' }}>
          {[1, 2, 3, 4, 5].map((s, i) => (
            <button
              key={s}
              onClick={() => setCurrentStyle(s)}
              className={currentStyle === s ? 'active' : ''}
              style={{
                background: currentStyle === s ? h.accent : 'transparent',
                color: currentStyle === s ? (currentStyle === 1 ? '#000' : '#fff') : (h.bg.includes('10') || h.bg.includes('15') ? 'rgba(255,255,255,0.5)' : '#888'),
              }}
            >
              {styleNames[i].toUpperCase()}
            </button>
          ))}
        </div>

        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        <div className="spacer desktop-only"></div>
      </div>

      {/* LIGNE 2: STATUT + NAVIGATION + CONNEXION (Desktop) */}
      <div className="header-l2 desktop-only">
        <div className="store-status">
          <div className="status-dot" style={{ background: '#00cc66', boxShadow: `0 0 10px #00cc66` }}></div>
          <span className="status-text" style={{ color: '#00cc66' }}>OUVERT</span>
        </div>

        <nav>
          {['Accueil', 'Notre Histoire', 'Collections', 'Nous Contacter'].map((item, idx) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: h.text }}>{item}</a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="btn-favorites-trigger"
            onClick={() => setIsFavoritesModalOpen(true)}
            style={{ color: h.text }}
          >
            <Heart size={20} fill={favorites.length > 0 ? h.accent : 'transparent'} />
            {favorites.length > 0 && <span className="fav-badge" style={{ background: h.accent }}>{favorites.length}</span>}
          </button>

          <div className="btn-connexion">
            {!isClientConnected ? (
              <button onClick={onShowAdmin} style={{ background: h.btnBg, color: h.btnText }}>CONNEXION 🔐</button>
            ) : (
              <button onClick={handleLogout} className="btn-logout" style={{ color: h.text }}>DECO. ✕</button>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" style={{ background: h.bg, color: h.text }}>
          <nav>
            {['Accueil', 'Notre Histoire', 'Collections', 'Nous Contacter'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} style={{ color: h.text }}>{item}</a>
            ))}
          </nav>
          <div className="mobile-universe-selector">
            <p>THÈMES</p>
            <div className="grid">
              {[1, 2, 3, 4, 5].map((s, i) => (
                <button key={s} onClick={() => { setCurrentStyle(s); setMobileMenuOpen(false); }} className={currentStyle === s ? 'active' : ''} style={{ background: currentStyle === s ? h.accent : 'transparent', color: currentStyle === s ? (currentStyle === 1 ? '#000' : '#fff') : h.text }}>
                  {styleNames[i]}
                </button>
              ))}
            </div>
          </div>
          {!isClientConnected ? (
            <button className="mobile-login" onClick={() => { onShowAdmin(); setMobileMenuOpen(false); }} style={{ background: h.btnBg, color: h.btnText }}>CONNEXION</button>
          ) : (
            <button className="mobile-login" onClick={() => { handleLogout(); setMobileMenuOpen(false); }} style={{ background: '#ff4444', color: '#fff' }}>DÉCONNEXION</button>
          )}
        </div>
      )}
    </header>
  );
}
