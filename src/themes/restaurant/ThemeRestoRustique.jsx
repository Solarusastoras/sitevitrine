import React from 'react';
import { Coffee, Map } from 'lucide-react';

export default function ThemeRestoRustique({ siteData, products }) {
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
    <div className="theme-resto-rustique" style={{ background: 'var(--bg-dark)', color: 'var(--text-main)', fontFamily: 'var(--font-main)', minHeight: '100vh', padding: '0 5%' }}>
      <header style={{ padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '900', fontFamily: 'Bitter, serif' }}>{siteData.nomEntreprise}</div>
        <div style={{ display: 'flex', gap: '25px', fontWeight: '700', fontSize: '0.9rem' }}>
          <span>LA CARTE</span>
          <span>RÉSERVATION</span>
        </div>
      </header>

      <header style={{ padding: '60px 0', textAlign: 'center' }}>
        <div style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: '700', letterSpacing: '4px', marginBottom: '15px' }}>TERROIR & SAVEURS</div>
        <h1 style={{ fontSize: '4rem', fontWeight: '900', fontFamily: 'Bitter, serif' }}>{siteData.nomEntreprise}</h1>
        <div style={{ width: '100px', height: '4px', background: 'var(--primary)', margin: '30px auto' }}></div>
      </header>

      <section style={{ padding: '80px 0', display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px' }}>
          <img src={products[1]?.img || products[1]?.image_url} alt="Ambiance" style={{ width: '100%', borderRadius: '40px', boxShadow: '20px 20px 0 var(--primary)' }} />
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '30px' }}>Notre Cuisine Authentique</h2>
          <p style={{ fontSize: '1.3rem', lineHeight: '1.8', opacity: 0.8 }}>{siteData.descriptionLongue}</p>
        </div>
      </section>

      <section style={{ padding: '100px 0', background: 'var(--bg-card)', borderRadius: '60px', margin: '100px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '3.5rem', fontFamily: 'Bitter, serif' }}>La Table de Saison</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', padding: '0 40px' }}>
          {products.slice(0, 6).map((p, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ height: '300px', borderRadius: '30px', overflow: 'hidden', marginBottom: '25px', border: '8px solid white', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
                <img src={p.img || p.image_url} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{p.nom || p.name}</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: '900' }}>{p.prix || "21"}€</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" style={{ padding: '100px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
         <div className="reveal" style={{ 
            background: 'rgba(255, 255, 255, 0.5)', padding: '60px', borderRadius: '40px', 
            border: '2px dashed var(--primary)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
          }}>
            <h2 className="blur-reveal" style={{ fontSize: '2.5rem', marginBottom: '40px', fontFamily: 'Bitter, serif', color: '#283618' }}>Passer nous voir</h2>
            <div style={{ marginBottom: '40px' }}>
              {Object.entries(siteData.horaires).map(([day, hours]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '1.2rem' }}>
                  <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>{day}</span>
                  <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{hours}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '20px', background: '#fefae0', borderRadius: '20px', borderLeft: '5px solid var(--primary)' }}>
               <strong style={{ display: 'block', marginBottom: '5px' }}>NOTRE ADRESSE</strong>
               {siteData.adresse}
            </div>
         </div>
         <div className="reveal" style={{ borderRadius: '40px', overflow: 'hidden', border: '5px solid #fff', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <iframe src={siteData.mapsIframeUrl} width="100%" height="100%" style={{ border: 0, filter: 'sepia(0.2) contrast(0.9)' }} loading="lazy"></iframe>
         </div>
      </section>

      <footer style={{ padding: '80px 0', textAlign: 'center', opacity: 0.6 }}>
         <Coffee size={30} style={{ marginBottom: '30px', color: 'var(--primary)' }} />
         <p>{siteData.nomEntreprise} • Esprit de Famille • 2026</p>
         <div style={{ marginTop: '40px', opacity: 0.3 }}><Map size={24} /></div>
      </footer>
    </div>
  );
}
