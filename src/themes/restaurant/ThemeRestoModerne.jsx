import React from 'react';
import { Camera, Layers, Zap } from 'lucide-react';

export default function ThemeRestoModerne({ siteData, products }) {
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
    <div className="theme-resto-moderne" style={{ background: 'var(--bg-dark)', color: 'var(--text-main)', fontFamily: 'var(--font-main)', minHeight: '100vh' }}>
      <header style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000', position: 'fixed', top: 0, width: '100%', zIndex: 1000, borderBottom: '1px solid #333' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: '900', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '2px' }}>{siteData.nomEntreprise}</div>
        <nav style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase' }}>
          <a href="#menu" style={{ color: '#fff', textDecoration: 'none' }}>Menu</a>
          <a href="#footer" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a>
        </nav>
      </header>

      <section style={{ height: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#000', color: '#fff', paddingTop: '60px' }}>
        <div style={{ padding: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Zap size={40} style={{ color: 'var(--primary)', marginBottom: '30px' }} />
          <h1 style={{ fontSize: '5rem', fontWeight: '900', textTransform: 'uppercase', lineHeight: '0.9', marginBottom: '30px' }}>{siteData.nomEntreprise}</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '40px' }}>{siteData.descriptionCourte}</p>
          <button style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '20px 50px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', alignSelf: 'flex-start' }}>VOIR LA CARTE</button>
        </div>
        <div style={{ background: `url(${products[0]?.img || products[0]?.image_url}) center/cover no-repeat` }}></div>
      </section>

      <section style={{ padding: '120px 10%' }}>
        {categories.map(cat => grouped[cat] && (
          <div key={cat} style={{ marginBottom: '100px' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: '900', textTransform: 'uppercase', color: 'rgba(0,0,0,0.1)', marginBottom: '-30px', paddingLeft: '20px' }}>{cat}s</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', position: 'relative', zIndex: 1 }}>
              {grouped[cat].map((p, i) => (
                <div key={i} style={{ border: '2px solid #000', padding: '30px', transition: 'all 0.3s', position: 'relative' }}>
                  {p.tag && (
                    <div style={{ position: 'absolute', top: '-12px', right: '20px', background: '#000', color: 'var(--primary)', padding: '5px 15px', fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase', zIndex: 10 }}>{p.tag}</div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '900' }}>{p.nom || p.name}</h3>
                    <div style={{ background: '#000', color: '#fff', padding: '5px 10px', fontSize: '1.1rem', fontWeight: '700' }}>{p.prix || "19"}€</div>
                  </div>
                  <p style={{ fontSize: '1rem', opacity: 0.6 }}>{p.desc || p.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="contact" style={{ padding: '120px 10%', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px' }}>
          <div className="reveal">
            <h2 className="blur-reveal" style={{ fontSize: '3rem', fontWeight: '900', textTransform: 'uppercase', marginBottom: '40px' }}>Nous Visiter</h2>
            <div style={{ borderTop: '10px solid #000', paddingTop: '30px' }}>
              {Object.entries(siteData.horaires).map(([day, hours]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee', fontSize: '1.2rem', fontWeight: '700' }}>
                  <span style={{ textTransform: 'uppercase' }}>{day}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ border: '4px solid #000', padding: '40px', background: 'var(--primary)', color: '#000' }}>
               <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '15px' }}>ADRESSE</h3>
               <p style={{ fontSize: '1.1rem', fontWeight: '700' }}>{siteData.adresse}</p>
            </div>
            <div style={{ flex: 1, border: '4px solid #000', overflow: 'hidden' }}>
              <iframe src={siteData.mapsIframeUrl} width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1) invert(1)' }} loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: '80px 10%', background: '#000', color: '#fff', textAlign: 'center' }}>
         <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{siteData.nomEntreprise}</h2>
         <p style={{ opacity: 0.5, fontSize: '0.8rem' }}>PROJET VITRINE PREMIUM • 2026</p>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px', opacity: 0.3 }}><Camera /><Layers /></div>
      </footer>
    </div>
  );
}
