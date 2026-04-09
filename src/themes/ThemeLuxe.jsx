import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

export default function ThemeLuxe({ siteData, products }) {
  if (!siteData) return null;

  return (
    <div className="theme-luxe">
      <div className="l-border-frame"></div>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '40px 60px', alignItems: 'center' }}>
        <div style={{ fontFamily: 'serif', fontSize: '24px', letterSpacing: '4px', fontWeight: '700' }}>
          {siteData.nomEntreprise.toUpperCase()}
        </div>
        <nav style={{ display: 'flex', gap: '30px', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>
          <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>Notre Histoire</a>
          <a href="#services" style={{ textDecoration: 'none', color: 'inherit' }}>Collections</a>
          <a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>Nous Contacter</a>
        </nav>
      </header>

      <section className="l-hero" style={{ padding: '0 60px', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
         <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `url(${products[0]?.img || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80'})`,
            backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.7)'
         }}></div>
         <div className="l-hero-inner" style={{ position: 'relative', zIndex: 10 }}>
            <h1 style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '3.5rem', marginBottom: '20px' }}>{siteData.nomEntreprise}</h1>
            <p style={{ fontSize: '1rem', letterSpacing: '1px', marginBottom: '30px', opacity: 0.8 }}>{siteData.descriptionCourte}</p>
            <a href="#services" className="l-btn-elegant" style={{ textDecoration: 'none', display: 'inline-block' }}>Découvrir l'Expérience</a>
         </div>
      </section>

      <section id="about" style={{ padding: '100px 60px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'serif', fontSize: '3rem', marginBottom: '40px' }}>L'Art de {siteData.metier}</h2>
        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.8', opacity: 0.7 }}>
          {siteData.descriptionLongue}
        </p>
      </section>

      <section id="services" style={{ padding: '100px 60px' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'serif', marginBottom: '80px', fontSize: '2.5rem' }}>Nos Pièces Signature</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
          {products.map((p, i) => (
            <div key={i} className={`l-product-card ${i % 2 !== 0 ? 'offset-down' : ''}`}>
              <div className="l-img-frame">
                <img src={p.img || p.image_url} alt={p.nom} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
              </div>
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', letterSpacing: '2px', opacity: 0.5 }}>{siteData.metier.toUpperCase()}</span>
                <h3 style={{ fontFamily: 'serif', fontSize: '1.5rem', margin: '5px 0' }}>{p.nom}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" style={{ background: '#fff', padding: '120px 10%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
           <div>
              <span style={{ color: 'var(--luxe-primary)', letterSpacing: '4px', fontSize: '12px' }}>CONTACT</span>
              <h2 style={{ fontSize: '3.5rem', fontFamily: 'serif', margin: '20px 0' }}>La Maison {siteData.nomEntreprise}</h2>
              <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.8' }}>{siteData.adresse}</p>
              <div style={{ marginTop: '40px' }}>
                 <h4>Horaires</h4>
                 <div style={{ marginTop: '20px' }}>
                    {Object.entries(siteData.horaires).map(([day, hours]) => (
                      <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                        <span style={{ textTransform: 'capitalize' }}>{day}</span>
                        <strong>{hours}</strong>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
           <div style={{ height: '500px', border: '10px solid var(--luxe-accent)', overflow: 'hidden' }}>
              <iframe 
                src={siteData.mapsIframeUrl} 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              ></iframe>
           </div>
        </div>
      </section>

      <footer style={{ padding: '60px 0', textAlign: 'center', background: '#fff', borderTop: '1px solid #eee' }}>
         <h2 style={{ fontFamily: 'serif', letterSpacing: '8px' }}>{siteData.nomEntreprise.toUpperCase()}</h2>
         <p style={{ fontSize: '10px', letterSpacing: '3px', marginTop: '20px', opacity: 0.4 }}>PARIS • MILANO • TOKYO</p>
      </footer>
    </div>
  );
}
