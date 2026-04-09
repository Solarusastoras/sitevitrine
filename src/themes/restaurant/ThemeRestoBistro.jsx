import React from 'react';
import { Calendar, Info } from 'lucide-react';

export default function ThemeRestoBistro({ siteData, products }) {
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
    <div className="theme-resto-bistro" style={{ background: 'var(--bg-dark)', color: 'var(--text-main)', fontFamily: 'var(--font-main)', minHeight: '100vh', padding: '0 5%' }}>
      <header style={{ padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderRadius: '0 0 20px 20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontSize: '1.4rem', fontFamily: 'Handlee, cursive', color: 'var(--primary)' }}>{siteData.nomEntreprise}</div>
        <div style={{ fontWeight: '800', fontSize: '0.8rem' }}>{siteData.telephone}</div>
      </header>

      <header style={{ background: 'var(--primary)', color: '#fff', padding: '20px 40px', borderRadius: '0 0 40px 40px', textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '400', fontFamily: 'Handlee, cursive' }}>{siteData.nomEntreprise}</h1>
        <p style={{ opacity: 0.8, fontSize: '1rem', fontStyle: 'italic' }}>Simplicité & Partage</p>
      </header>

      <section style={{ padding: '40px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
         <div style={{ padding: '40px', background: 'white', borderRadius: '30px', transform: 'rotate(-2deg)', boxShadow: '10px 10px 0 var(--primary)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontFamily: 'Handlee, cursive' }}>Le Concept</h2>
            <p style={{ fontSize: '1.2rem' }}>{siteData.descriptionCourte}</p>
         </div>
         <div style={{ padding: '40px', background: 'white', borderRadius: '30px', transform: 'rotate(2deg)', boxShadow: '10px 10px 0 var(--primary)', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <Calendar size={40} style={{ color: 'var(--primary)', margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>RÉSERVEZ : {siteData.telephone}</h2>
         </div>
         <div style={{ background: `url(${products[2]?.img || products[2]?.image_url}) center/cover no-repeat`, borderRadius: '30px' }}></div>
      </section>

      <section style={{ padding: '100px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px', transform: 'scale(1.2)' }}>
          <h2 style={{ fontSize: '4rem', fontFamily: 'Handlee, cursive', color: 'var(--primary)' }}>L'Ardoise du Jour</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {categories.slice(0, 3).map(cat => grouped[cat] && (
            <div key={cat} style={{ background: 'white', padding: '40px', borderRadius: '30px', border: '2px solid var(--primary)' }}>
              <h3 style={{ fontSize: '2.5rem', fontFamily: 'Handlee, cursive', marginBottom: '30px', textAlign: 'center' }}>{cat}s</h3>
              <div style={{ display: 'grid', gap: '25px' }}>
                {grouped[cat].map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '15px', borderBottom: '1px solid rgba(0,0,0,0.05)', position: 'relative' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ fontWeight: '700' }}>{p.nom || p.name}</div>
                      {p.tag && (
                        <span style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.6rem', padding: '2px 6px', borderRadius: '3px', fontWeight: '900' }}>{p.tag}</span>
                      )}
                    </div>
                    <div style={{ color: 'var(--primary)', fontWeight: '900' }}>{p.prix || "14"}€</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" style={{ padding: '100px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '50px' }}>
         <div className="reveal" style={{ 
            background: '#222', color: '#fff', padding: '60px', borderRadius: '15px', 
            border: '12px solid #444', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)',
            transform: 'rotate(-1deg)', fontFamily: 'Handlee, cursive' 
          }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', borderBottom: '1px dashed #fff', paddingBottom: '10px' }}>L'Ardoise des Horaires</h2>
            <div style={{ fontSize: '1.3rem' }}>
              {Object.entries(siteData.horaires).map(([day, hours]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                  <span style={{ textTransform: 'capitalize' }}>{day}</span>
                  <span style={{ color: 'var(--primary)' }}>{hours}</span>
                </div>
              ))}
            </div>
         </div>

         <div className="reveal" style={{ background: '#fff', padding: '50px', borderRadius: '30px', border: '2px solid var(--primary)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '30px', fontFamily: 'Handlee, cursive' }}>Où nous trouver ?</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>📍 {siteData.adresse}</p>
            <div style={{ height: '250px', borderRadius: '20px', overflow: 'hidden' }}>
               <iframe src={siteData.mapsIframeUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy"></iframe>
            </div>
         </div>
      </section>

      <footer style={{ padding: '80px 0', textAlign: 'center', opacity: 0.5 }}>
         <Info size={30} style={{ marginBottom: '20px', color: 'var(--primary)' }} />
         <p>{siteData.nomEntreprise} • 2026</p>
      </footer>
    </div>
  );
}
