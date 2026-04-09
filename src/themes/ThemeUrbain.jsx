import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export default function ThemeUrbain({ siteData, products }) {
  if (!siteData) return null;

  return (
    <div className="theme-urbain">
      <header className="u-header" style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: '900', fontSize: '2rem', letterSpacing: '4px' }}>{siteData.nomEntreprise}</div>
        <nav style={{ display: 'flex', gap: '30px', fontWeight: '700', fontSize: '14px' }}>
          <a href="#about" style={{ textDecoration: 'none', color: '#fff' }}>INFO</a>
          <a href="#products" style={{ textDecoration: 'none', color: '#fff' }}>DROP</a>
          <a href="#contact" style={{ textDecoration: 'none', color: '#fff' }}>LAB</a>
        </nav>
      </header>

      <section className="u-bento-hero">
        <div className="u-hero-main">
          <h1 style={{ fontSize: '5rem', lineHeight: '0.9', fontWeight: '900', marginBottom: '30px' }}>
            {siteData.metier.toUpperCase()}<br/>EXPERIENCE
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.6, marginBottom: '40px', maxWidth: '500px' }}>
            {siteData.descriptionCourte}
          </p>
          <button className="u-btn-neon">EXPLORE THE DROP</button>
        </div>
        <div style={{ background: `url(${products[0]?.img || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80'})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid #333' }}></div>
        <div style={{ background: `url(${products[1]?.img || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80'})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid #333' }}></div>
        <div style={{ background: '#111', border: '1px solid #333', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--urbain-primary)' }}>-20%</h2>
          <p style={{ opacity: 0.5, fontSize: '0.8rem' }}>CODE: DEMO_SITE</p>
        </div>
      </section>

      <div className="u-marquee">
        <span>{siteData.metier.toUpperCase()} /// {siteData.nomEntreprise.toUpperCase()} /// {siteData.metier.toUpperCase()} /// {siteData.nomEntreprise.toUpperCase()} ///</span>
      </div>

      <section id="about" style={{ padding: '100px 40px', background: '#000' }}>
         <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '30px', color: 'var(--urbain-primary)' }}>THE LAB MISSION</h2>
         <p style={{ fontSize: '1.8rem', lineHeight: '1.4', fontWeight: '700', maxWidth: '900px' }}>
           {siteData.descriptionLongue}
         </p>
      </section>

      <section id="products" style={{ padding: '100px 40px', background: '#050505' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '900', letterSpacing: '4px', marginBottom: '60px', opacity: 0.4 }}>LATEST DROPS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {products.map((p, i) => (
             <div key={i} style={{ border: '1px solid #222', background: '#111', transition: '0.3s' }}>
                <div style={{ height: '300px', background: '#333', overflow: 'hidden' }}>
                   <img src={p.img} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px' }}>
                   <h3 style={{ fontSize: '1.3rem', fontWeight: '900' }}>{p.nom}</h3>
                   <span style={{ color: 'var(--urbain-primary)', fontSize: '0.9rem', fontWeight: '700' }}>AVAILABLE NOW</span>
                </div>
             </div>
          ))}
        </div>
      </section>

      <section id="contact" style={{ padding: '100px 40px', background: '#000' }}>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div style={{ border: '1px solid #222', padding: '40px' }}>
               <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '20px' }}>ACCESS POINT</h3>
               <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}><MapPin size={16} /> {siteData.adresse}</p>
               <button style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '10px 20px', fontSize: '10px', fontWeight: '900' }}>GET DIRECTIONS</button>
            </div>
            <div style={{ border: '1px solid #222', padding: '40px' }}>
               <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '20px' }}>OPERATING LOGS</h3>
               {Object.entries(siteData.horaires).map(([day, hours]) => (
                 <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #111', fontSize: '14px' }}>
                   <span style={{ textTransform: 'uppercase', opacity: 0.5 }}>{day}</span>
                   <strong>{hours}</strong>
                 </div>
               ))}
            </div>
         </div>
         <div style={{ height: '400px', background: '#111', marginTop: '40px', border: '1px solid #222' }}>
            <iframe src={siteData.mapsIframeUrl} width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} loading="lazy"></iframe>
         </div>
      </section>

      <footer style={{ padding: '60px 40px', textAlign: 'center', borderTop: '1px solid #222' }}>
         <div style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '4px' }}>{siteData.nomEntreprise}</div>
         <p style={{ opacity: 0.4, fontSize: '10px', marginTop: '10px' }}>JOIN THE SYNDICATE /// LAB_v2.6</p>
      </footer>
    </div>
  );
}
