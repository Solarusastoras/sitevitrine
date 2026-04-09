import React from 'react';
import { Leaf, Map, Compass } from 'lucide-react';

export default function ThemeEco({ siteData, products }) {
  if (!siteData) return null;

  return (
    <div className="theme-eco">
      <header style={{ padding: '30px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--eco-primary)', fontFamily: 'serif' }}>{siteData.nomEntreprise}</div>
        <nav style={{ display: 'flex', gap: '40px', fontWeight: '500', fontSize: '15px' }}>
          <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>Notre Vision</a>
          <a href="#products" style={{ textDecoration: 'none', color: 'inherit' }}>Produits</a>
          <a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>Localisation</a>
        </nav>
      </header>

      <section style={{ padding: '80px 10%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
         <div className="e-hero-img-box" style={{ height: '70vh' }}>
            <img src={products[0]?.img || 'https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=1200&q=80'} alt="Eco Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
         </div>
         <div>
            <h1 style={{ fontSize: '4.5rem', fontFamily: 'serif', lineHeight: '1.1', marginBottom: '30px' }}>Naturellement<br/>{siteData.nomEntreprise}</h1>
            <p style={{ fontSize: '1.4rem', opacity: 0.7, marginBottom: '40px', lineHeight: '1.6' }}>
               {siteData.descriptionCourte}
            </p>
            <button style={{ background: 'var(--eco-primary)', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '50px', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer' }}>
               Découvrir Notre Univers
            </button>
         </div>
      </section>

      <section id="about" style={{ padding: '120px 10%', textAlign: 'center', background: '#fff' }}>
         <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <Leaf size={40} style={{ color: 'var(--eco-primary)', marginBottom: '30px' }} />
            <h2 style={{ fontSize: '3rem', fontFamily: 'serif', marginBottom: '30px' }}>Engagement {siteData.metier}</h2>
            <p style={{ fontSize: '1.5rem', lineHeight: '1.8', opacity: 0.8 }}>
               {siteData.descriptionLongue}
            </p>
         </div>
      </section>

      <section id="products" style={{ padding: '120px 10%' }}>
         <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '3.5rem', fontFamily: 'serif' }}>Sélection Responsable</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.5, marginTop: '10px' }}>Cultivé avec soin, partagé avec passion.</p>
         </div>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            {products.map((p, i) => (
               <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ borderRadius: '20px', overflow: 'hidden', height: '350px', marginBottom: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)' }}>
                     <img src={p.img} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontFamily: 'serif', marginBottom: '10px' }}>{p.nom}</h3>
                  <p style={{ opacity: 0.6, fontSize: '0.95rem' }}>{p.desc}</p>
               </div>
            ))}
         </div>
      </section>

      <section id="contact" style={{ padding: '100px 10%', background: '#fff' }}>
         <div style={{ background: 'var(--eco-accent)', borderRadius: '40px', padding: '60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <Leaf size={24} style={{ color: 'var(--eco-primary)' }} />
                  <h2 style={{ fontSize: '2.5rem', fontFamily: 'serif' }}>Notre Écrin</h2>
               </div>
               <p style={{ fontSize: '1.3rem', marginBottom: '40px' }}><Map size={20} /> {siteData.adresse}</p>
               
               <div style={{ marginBottom: '40px' }}>
                  <h4 style={{ fontSize: '0.8rem', letterSpacing: '4px', opacity: 0.5, marginBottom: '20px' }}>HORAIRES</h4>
                  <div>
                    {Object.entries(siteData.horaires).map(([day, hours]) => (
                      <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                         <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>{day}</span>
                         <strong>{hours}</strong>
                      </div>
                    ))}
                  </div>
               </div>
               <button style={{ background: 'var(--eco-primary)', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '50px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Compass size={18} /> NOUS TROUVER
               </button>
            </div>
            <div style={{ height: '500px', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
               <iframe src={siteData.mapsIframeUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy"></iframe>
            </div>
         </div>
      </section>

      <footer style={{ padding: '80px 60px', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
         <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--eco-primary)', fontFamily: 'serif' }}>{siteData.nomEntreprise}</div>
         <p style={{ opacity: 0.4, marginTop: '15px', fontSize: '14px' }}>Respect de la terre • Engagement quotidien • 2026</p>
      </footer>
    </div>
  );
}
