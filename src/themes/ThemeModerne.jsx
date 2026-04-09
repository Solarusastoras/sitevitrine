import React, { useState } from 'react';
import { MapPin, Navigation, ArrowRight, ArrowDown } from 'lucide-react';

export default function ThemeModerne({ siteData, products }) {
  const [userAddress, setUserAddress] = useState('');
  const [mapUrl, setMapUrl] = useState(siteData?.mapsIframeUrl);
  if (!siteData) return null;

  const handleItinerary = () => {
    if (!userAddress) return;
    const newUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(userAddress)}&daddr=${encodeURIComponent(siteData.adresse)}&output=embed`;
    setMapUrl(newUrl);
  };

  return (
    <div className="theme-moderne">

      {/* 📐 HERO - MAGAZINE STYLE */}
      <section style={{ padding: '120px 5%', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr', borderBottom: '4px solid #000' }}>
        <div style={{ position: 'relative' }}>
          <span className="m-section-num" style={{ opacity: 0.1 }}>01</span>
          <div className="m-slide" style={{ animationDelay: '0.1s' }}>
            <h1 className="m-hero-title" style={{ fontSize: '6rem', fontWeight: '900', lineHeight: '0.85', margin: '40px 0', textTransform: 'uppercase' }}>
              {siteData.nomEntreprise.split(' ')[0]}<br/>
              <span className="m-accent-blue">{siteData.nomEntreprise.split(' ')[1] || ''}</span>
            </h1>
            <p style={{ fontSize: '1.4rem', fontWeight: '600', maxWidth: '400px', borderLeft: '4px solid #3b82f6', paddingLeft: '20px', marginBottom: '60px' }}>
              {siteData.descriptionCourte}
            </p>
            <button className="m-btn-black">Explorer le Projet <ArrowRight style={{ marginLeft: '10px' }} /></button>
          </div>
        </div>
        <div className="m-slide" style={{ animationDelay: '0.4s', borderLeft: '4px solid #000', paddingLeft: '40px' }}>
           <div style={{ height: '700px', background: '#f0f0f0' }}>
              <img src={products[0]?.img || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Hero" />
           </div>
        </div>
      </section>

      {/* 📦 SELECTION - MODULAR GRID */}
      <section id="products" style={{ padding: '100px 5%', background: '#fafafa' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }} className="m-slide">
           <div>
              <span style={{ fontWeight: '900', fontSize: '1rem', letterSpacing: '4px', color: '#888' }}>SELECTED ITEMS</span>
              <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginTop: '10px' }}>DESIGN <span className="m-accent-blue">STRIKE</span></h2>
           </div>
           <ArrowDown size={48} className="m-accent-blue" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          {products.map((p, i) => (
             <div key={i} className="m-slide" style={{ animationDelay: `${0.2 * i}s`, border: '2px solid #000', background: '#fff' }}>
                <div style={{ height: '400px', borderBottom: '2px solid #000', overflow: 'hidden' }}>
                   <img src={p.img || p.image_url} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '30px', position: 'relative' }}>
                   <span style={{ position: 'absolute', top: '-15px', right: '20px', background: '#000', color: '#fff', padding: '5px 15px', fontWeight: '900', fontSize: '0.8rem' }}>0{i+1}</span>
                   <h3 style={{ fontSize: '1.6rem', fontWeight: '900' }}>{p.nom}</h3>
                   <p style={{ opacity: 0.6, fontSize: '1rem', margin: '15px 0' }}>{p.desc || p.description}</p>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
                      <span style={{ fontWeight: '900', fontSize: '1.5rem' }}>{p.prix || '---'}</span>
                      <button style={{ border: '2px solid #000', background: 'transparent', padding: '10px 20px', fontWeight: '900', cursor: 'pointer' }}>ADD</button>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* 🗺️ CONTACT & MAP - ARCHITECTURAL BLOCK */}
      <section id="contact" style={{ borderTop: '4px solid #000' }}>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ padding: '100px 10%' }}>
               <h3 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '40px' }}>STATION <span className="m-accent-blue">{siteData.adresse.split(' ')[0]}</span></h3>
               
               <div style={{ borderLeft: '10px solid #000', paddingLeft: '30px', marginBottom: '60px' }}>
                  <p style={{ fontSize: '1.4rem', fontWeight: '700' }}>{siteData.adresse}</p>
                  <p style={{ fontSize: '1rem', marginTop: '10px', opacity: 0.5 }}>Notre emplacement stratégique au cœur de la ville.</p>
               </div>

               <div style={{ background: '#000', color: '#fff', padding: '40px' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: '900', letterSpacing: '4px', marginBottom: '30px' }}>OPERATING HOURS</h4>
                  {Object.entries(siteData.horaires).map(([day, hours]) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #333' }}>
                      <span style={{ textTransform: 'uppercase', fontWeight: '600', color: '#888' }}>{day}</span>
                      <span style={{ fontWeight: '700' }}>{hours}</span>
                    </div>
                  ))}
               </div>

               <div style={{ marginTop: '60px' }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                     <input type="text" placeholder="Origine du trajet..." value={userAddress} onChange={(e) => setUserAddress(e.target.value)} style={{ flex: 1, border: '4px solid #000', padding: '15px', fontWeight: '700', outline: 'none' }} />
                  </div>
                  <button onClick={handleItinerary} className="m-btn-black" style={{ width: '100%' }}>Lancer le Guidage</button>
               </div>
            </div>

            <div style={{ borderLeft: '4px solid #000', position: 'relative' }}>
               <iframe src={mapUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy"></iframe>
               <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: '#3b82f6', color: '#fff', padding: '10px 20px', fontWeight: '900', fontSize: '0.8rem' }}>SIGNAL DÉTECTÉ</div>
            </div>
         </div>
      </section>

      <footer style={{ padding: '60px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '4px solid #000' }}>
         <div style={{ fontSize: '2rem', fontWeight: '900' }}>{siteData.nomEntreprise} <span className="m-accent-blue">©</span></div>
         <p style={{ fontWeight: '900', letterSpacing: '2px', fontSize: '0.7rem' }}>SYSTEM_VERSION: BAUHAUS_EDITION_2026</p>
      </footer>
    </div>
  );
}
