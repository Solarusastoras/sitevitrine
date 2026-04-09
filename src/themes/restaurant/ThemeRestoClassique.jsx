import React from 'react';
import { Wine, UtensilsCrossed } from 'lucide-react';

export default function ThemeRestoClassique({ siteData, products }) {
  if (!siteData) return null;

  const categories = ["Entrée", "Plat", "Dessert", "Boisson"];
  const grouped = products.reduce((acc, p) => {
    const cat = p.category || p.type || "Plat";
    const key = categories.find(c => cat.toLowerCase().includes(c.toLowerCase())) || "Plat";
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  return (
    <div className="theme-resto-classique" style={{ background: 'var(--bg-dark)', color: 'var(--text-main)', fontFamily: 'var(--font-main)', minHeight: '100vh', padding: '0 5%' }}>
      <header style={{ padding: '20px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'center' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: '800', letterSpacing: '3px', textTransform: 'uppercase' }}>{siteData.nomEntreprise}</div>
      </header>

      <header style={{ padding: '40px 0', textAlign: 'center', borderBottom: '1px solid var(--primary)' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '400', letterSpacing: '2px', color: 'var(--primary)' }}>{siteData.nomEntreprise}</h1>
        <p style={{ fontStyle: 'italic', opacity: 0.6, fontSize: '0.9rem', marginTop: '10px' }}>Une tradition culinaire d'exception</p>
      </header>

      <section style={{ padding: '80px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
        <div style={{ height: '70vh', border: '1px solid var(--primary)', padding: '20px' }}>
          <img src={products[0]?.img || products[0]?.image_url} alt="Resto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <h2 style={{ fontSize: '4rem', marginBottom: '30px' }}>{siteData.descriptionCourte}</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>{siteData.descriptionLongue}</p>
          <div style={{ marginTop: '50px', padding: '30px', border: '1px solid var(--primary)', display: 'inline-block' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>RÉSERVEZ : {siteData.telephone}</span>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0', background: 'rgba(163, 123, 66, 0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '3.5rem', fontFamily: 'serif' }}>La Carte</h2>
          <UtensilsCrossed size={30} style={{ color: 'var(--primary)', marginTop: '20px' }} />
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {categories.map(cat => grouped[cat] && (
            <div key={cat} style={{ marginBottom: '80px' }}>
              <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '50px', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--primary)' }}>{cat}s</h3>
              <div style={{ display: 'grid', gap: '40px' }}>
                {grouped[cat].map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px dotted var(--primary)', paddingBottom: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h4 style={{ fontSize: '1.4rem', marginBottom: '5px' }}>{p.nom || p.name}</h4>
                        {p.tag && (
                          <span style={{ fontSize: '0.65rem', color: '#fff', background: 'var(--primary)', padding: '2px 8px', borderRadius: '50px', fontWeight: '800', textTransform: 'uppercase' }}>{p.tag}</span>
                        )}
                      </div>
                      <p style={{ fontSize: '0.9rem', opacity: 0.6, fontStyle: 'italic' }}>{p.desc || p.description}</p>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', paddingLeft: '20px' }}>{p.prix || "22"}€</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" style={{ padding: '120px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <div className="reveal" style={{ 
            maxWidth: '700px', width: '100%', padding: '60px', 
            border: '1px solid var(--primary)', outline: '4px solid var(--primary)', outlineOffset: '10px',
            textAlign: 'center', background: '#fff'
          }}>
            <h2 className="blur-reveal" style={{ fontSize: '2.5rem', marginBottom: '40px', fontFamily: 'serif', letterSpacing: '2px' }}>Heures d'Ouverture</h2>
            <div style={{ marginBottom: '50px' }}>
              {Object.entries(siteData.horaires).map(([day, hours]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid rgba(163, 123, 66, 0.2)', fontSize: '1.2rem', fontStyle: 'italic' }}>
                  <span style={{ textTransform: 'capitalize' }}>{day}</span>
                  <span style={{ fontWeight: '700' }}>{hours}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{siteData.adresse}</p>
            <p style={{ fontSize: '1.1rem', opacity: 0.6 }}>Réservations recommandées</p>
         </div>
         <div className="reveal" style={{ width: '100%', height: '400px', marginTop: '100px', filter: 'sepia(0.3) contrast(1.1)' }}>
            <iframe src={siteData.mapsIframeUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy"></iframe>
         </div>
      </section>

      <footer style={{ padding: '60px 0', textAlign: 'center', borderTop: '1px solid var(--primary)', opacity: 0.5 }}>
         <Wine size={24} style={{ marginBottom: '20px' }} />
         <p>{siteData.adresse} • 2026</p>
      </footer>
    </div>
  );
}
