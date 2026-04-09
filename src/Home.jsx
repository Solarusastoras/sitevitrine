import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PROFESSIONS } from './professions';

const CATEGORIES = [
  { id: 'SANTE', label: 'Santé & Soins', icon: '🩺' },
  { id: 'FOOD', label: 'Alimentation', icon: '🥖' },
  { id: 'ARTISAN', label: 'Artisans', icon: '🛠️' },
  { id: 'SERVICES', label: 'Services', icon: '💼' },
  { id: 'CREATIF', label: 'Loisirs & Création', icon: '🎨' },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredProfessions = PROFESSIONS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 8);

  return (
    <div className="home-container">
      {/* HERO SEARCH */}
      <header className="hero reveal" style={{ height: '70vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '4rem', color: '#1a2a6c', marginBottom: '1rem' }}>Localisez votre professionnel</h1>
          <p style={{ fontSize: '1.5rem', opacity: 0.8, marginBottom: '3rem' }}>Quel métier recherchez-vous aujourd'hui ?</p>
          
          <div className="search-box" style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <input 
              type="text" 
              placeholder="Ex: Boulangerie, Plombier, Podologue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '1.5rem 2rem', borderRadius: '50px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '1.2rem' }}
            />
            
            {search && filteredProfessions.length > 0 && (
              <ul style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: 'white', listStyle: 'none', textAlign: 'left', borderRadius: '15px', marginTop: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', overflow: 'hidden', zIndex: 10 }}>
                {filteredProfessions.map(p => (
                  <li key={p.name}>
                    <button 
                      onClick={() => navigate(`/secteur/${p.name}`)}
                      style={{ width: '100%', padding: '1rem 2rem', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                    >
                      {p.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* CATEGORIES GRID */}
      <section className="container" style={{ padding: '5rem 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '2.5rem' }}>Parcourir par catégories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {CATEGORIES.map(cat => (
            <Link 
              key={cat.id} 
              to={`/categorie/${cat.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div 
                className="category-card reveal" 
                style={{ background: 'white', padding: '3rem 2rem', borderRadius: '20px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', transition: 'transform 0.3s', border: '2px solid transparent' }}
                onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'var(--primary, #007bff)'}}
                onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'transparent'}}
              >
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.2rem', color: '#333' }}>{cat.label}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.5, marginTop: '1rem' }}>Explorer</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '4rem 0', background: '#1a2a6c', color: 'white', textAlign: 'center' }}>
        <p>© 2026 Annuaire Local Premium. Trouvez le meilleur autour de vous.</p>
      </footer>
    </div>
  );
}
