import React, { useState } from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';

export default function ThemeMinimal({ siteData, products }) {
  const [userAddress, setUserAddress] = useState('');
  const [mapUrl, setMapUrl] = useState(siteData?.mapsIframeUrl);
  if (!siteData) return null;

  const handleGeolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserAddress(`${latitude},${longitude}`);
        alert("📍 Position détectée !");
      });
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };

  const handleItinerary = () => {
    if (!userAddress) {
      alert("Veuillez entrer une adresse ou utiliser la géolocalisation.");
      return;
    }
    const newUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(userAddress)}&daddr=${encodeURIComponent(siteData.adresse)}&output=embed`;
    setMapUrl(newUrl);
  };

  return (
    <div className="theme-minimal">

      <section style={{ padding: '120px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{ fontSize: '5rem', fontWeight: '900', lineHeight: '1.1', marginBottom: '40px' }}>{siteData.nomEntreprise}</h1>
          <p style={{ fontSize: '1.5rem', opacity: 0.6, marginBottom: '60px' }}>{siteData.descriptionCourte}</p>
          <button style={{ background: '#000', color: '#fff', border: 'none', padding: '20px 40px', fontWeight: '800', letterSpacing: '2px', cursor: 'pointer' }}>EXPLORER</button>
        </div>
        <div style={{ height: '70vh', background: '#f5f5f5', overflow: 'hidden' }}>
          <img src={products[0]?.img || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80'} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      <section id="about" style={{ padding: '120px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ width: '80px', height: '2px', background: '#000', margin: '0 auto 40px auto' }}></div>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '30px' }}>Une Approche Pure</h2>
          <p style={{ fontSize: '1.4rem', lineHeight: '1.8', opacity: 0.7 }}>
            {siteData.descriptionLongue}
          </p>
        </div>
      </section>

      <section id="services" style={{ padding: '120px 60px' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '900', letterSpacing: '8px', marginBottom: '80px', textAlign: 'center' }}>NOS SERVICES</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {products.map((p, i) => (
             <div key={i} style={{ background: '#fff', border: '1px solid #eee', padding: '15px' }}>
                <div style={{ height: '350px', background: '#f9f9f9', overflow: 'hidden' }}>
                   <img src={p.img} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '30px 10px' }}>
                   <h3 style={{ fontSize: '1.4rem', fontWeight: '900', marginBottom: '10px' }}>{p.nom}</h3>
                   <p style={{ fontSize: '0.9rem', opacity: 0.5, lineHeight: '1.6' }}>{p.desc}</p>
                </div>
             </div>
          ))}
        </div>
      </section>

      <section id="contact" style={{ padding: '120px 60px' }}>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '60px', marginBottom: '60px' }}>
               <div>
                  <h3 style={{ fontSize: '3rem', fontWeight: '900' }}>Nous Trouver</h3>
                  <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>{siteData.adresse}</p>
               </div>
               <div style={{ textAlign: 'right' }}>
                  <h3 style={{ fontSize: '3rem', fontWeight: '900' }}>Horaires</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {Object.entries(siteData.horaires).map(([day, hours]) => (
                      <li key={day} style={{ display: 'flex', gap: '30px', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <span style={{ textTransform: 'uppercase', opacity: 0.5 }}>{day}</span>
                        <strong>{hours}</strong>
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
            <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #000' }}>
               <h4 style={{ fontSize: '0.8rem', fontWeight: '900', letterSpacing: '2px', marginBottom: '20px' }}>ITINÉRAIRE</h4>
               <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <button 
                    onClick={handleGeolocate}
                    style={{ background: '#000', border: 'none', padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                     <MapPin size={18} color="#fff" />
                  </button>
                  <input 
                    type="text" 
                    placeholder="Votre adresse de départ"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    style={{ flex: 1, border: '1px solid #eee', padding: '10px', fontSize: '13px', outline: 'none' }} 
                  />
               </div>
               <button 
                  onClick={handleItinerary}
                  style={{ width: '100%', background: '#000', color: '#fff', border: 'none', padding: '12px', fontWeight: '900', fontSize: '12px', cursor: 'pointer' }}
               >
                  CALCULER LE TRAJET
               </button>
            </div>

            <div style={{ height: '400px', background: '#eee' }}>
               <iframe src={mapUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy"></iframe>
            </div>
         </div>
      </section>

      <footer style={{ padding: '100px 60px', textAlign: 'center', borderTop: '1px solid #eee' }}>
         <p style={{ fontWeight: '900', letterSpacing: '4px' }}>© 2026 {siteData.nomEntreprise.toUpperCase()}</p>
      </footer>
    </div>
  );
}
