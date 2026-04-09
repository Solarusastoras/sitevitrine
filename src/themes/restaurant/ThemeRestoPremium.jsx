import React from 'react';
import { Utensils, Clock, MapPin, Star } from 'lucide-react';

export default function ThemeRestoPremium({ siteData, products }) {
  if (!siteData) return null;

  // Group products by category (normalize to Entrées, Plats, Desserts)
  const categories = ["Entrée", "Plat", "Dessert", "Boisson"];
  const grouped = products.reduce((acc, p) => {
    const cat = p.category || p.type || "Plat";
    const key = categories.find(c => cat.toLowerCase().includes(c.toLowerCase())) || "Plat";
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  const platDuJour = products[0];

  return (
    <div className="theme-resto-premium" style={{ background: 'var(--bg-dark)', color: 'var(--text-main)', fontFamily: 'var(--font-main)', minHeight: '100vh' }}>
      
      {/* Header */}
      <header style={{ padding: '20px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', position: 'fixed', top: 0, width: '100%', zIndex: 100, borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>{siteData.nomEntreprise}</div>
        <nav style={{ display: 'flex', gap: '30px', fontSize: '14px', fontWeight: '600' }}>
          <a href="#menu" style={{ textDecoration: 'none', color: 'inherit' }}>La Carte</a>
          <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>L'Expérience</a>
          <a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>Réservation</a>
        </nav>
      </header>

      {/* Hero */}
      <section style={{ padding: '120px 60px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', minHeight: '80vh' }}>
        <div>
          <span style={{ background: 'var(--primary)', color: '#000', padding: '5px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: '900', marginBottom: '20px', display: 'inline-block' }}>PLAT DU JOUR</span>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', lineHeight: '1.1', marginBottom: '30px' }}>{platDuJour?.nom || platDuJour?.name}</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.7, marginBottom: '40px', maxWidth: '500px' }}>{platDuJour?.desc || platDuJour?.description}</p>
          <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '40px' }}>{platDuJour?.prix || "24"}€</div>
          <button style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '15px 40px', borderRadius: '50px', fontWeight: '800', cursor: 'pointer' }}>RÉSERVER UNE TABLE</button>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ borderRadius: '30px', overflow: 'hidden', height: '600px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
            <img src={platDuJour?.img || platDuJour?.image_url} alt="Plat du jour" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', background: 'rgba(30, 41, 59, 0.9)', padding: '30px', borderRadius: '20px', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)' }}>
             <div style={{ display: 'flex', gap: '5px', color: 'var(--primary)', marginBottom: '10px' }}>
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
             </div>
             <div style={{ fontWeight: '700' }}>"Une explosion de saveurs"</div>
             <div style={{ fontSize: '12px', opacity: 0.5 }}>- Guide Gastronomique 2026</div>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section id="menu" style={{ padding: '100px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '4px' }}>NOTRE CARTE</span>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', marginTop: '10px' }}>Découvrez nos saveurs</h2>
        </div>

        {categories.map(cat => grouped[cat] && (
          <div key={cat} style={{ marginBottom: '80px' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '40px', paddingLeft: '20px', borderLeft: '4px solid var(--primary)' }}>{cat}s</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
              {grouped[cat].map((p, i) => (
                <div key={i} className="theme-resto-card" style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '0' }}>
                  <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                    <img src={p.img || p.image_url} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--primary)', color: '#000', padding: '5px 15px', borderRadius: '50px', fontWeight: '800' }}>{p.prix || "18"}€</span>
                  </div>
                  <div style={{ padding: '25px' }}>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '10px' }}>{p.nom || p.name}</h4>
                    <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: '1.6' }}>{p.desc || p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Info Sections */}
      <section id="contact" style={{ padding: '100px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
         <div className="reveal" style={{ 
            background: 'rgba(30, 41, 59, 0.4)', padding: '60px', borderRadius: '30px', 
            border: '1px solid var(--glass-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(20px)'
          }}>
            <h2 className="blur-reveal" style={{ fontSize: '2.5rem', marginBottom: '40px', color: 'var(--primary)', fontWeight: '900' }}>Horaires & Expérience</h2>
            <div style={{ marginBottom: '40px' }}>
              {Object.entries(siteData.horaires).map(([day, hours]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '1.1rem' }}>
                  <span style={{ textTransform: 'capitalize', fontWeight: '600', opacity: 0.8 }}>{day}</span>
                  <strong style={{ letterSpacing: '1px' }}>{hours}</strong>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '15px' }}>
               <MapPin size={30} color="var(--primary)" />
               <div style={{ fontSize: '1rem', lineHeight: '1.4' }}>
                 <strong>Localisation Premium</strong><br/>
                 {siteData.adresse}
               </div>
            </div>
         </div>
         <div className="reveal" style={{ borderRadius: '30px', overflow: 'hidden', border: '1px solid var(--glass-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
            <iframe src={siteData.mapsIframeUrl} width="100%" height="100%" style={{ border: 0, filter: 'grayscale(0.8) contrast(1.2)' }} loading="lazy"></iframe>
         </div>
      </section>

      <footer style={{ padding: '60px', textAlign: 'center', opacity: 0.4, borderTop: '1px solid var(--glass-border)' }}>
         <p>© 2026 {siteData.nomEntreprise} Gastronomie. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
