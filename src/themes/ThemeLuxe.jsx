import React, { useState } from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';

export default function ThemeLuxe({ siteData, products }) {
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
    // Mise à jour de l'URL pour un affichage in-situ
    const newUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(userAddress)}&daddr=${encodeURIComponent(siteData.adresse)}&output=embed`;
    setMapUrl(newUrl);
  };

  return (
    <div className="theme-luxe">
      <div className="l-border-frame"></div>
      
      {/* 1. HERO ÉDITORIAL ASYMÉTRIQUE */}
      <section className="l-hero" style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
         <div style={{
            position: 'absolute', top: 0, right: 0, width: '65%', height: '100%',
            backgroundImage: `url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2000')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            zIndex: 1
         }}></div>
         
         <div className="l-hero-inner reveal" style={{ width: '50%', position: 'relative', zIndex: 10 }}>
            <span className="l-gold-text" style={{ letterSpacing: '8px', fontSize: '0.9rem', fontWeight: '800', marginBottom: '20px', display: 'block' }}>MAISON ARTISANALE</span>
            <h1 style={{ fontSize: '7rem', lineHeight: '0.8', margin: '0 0 30px 0', textTransform: 'uppercase', color: '#fff', mixBlendMode: 'difference' }}>
              {siteData.nomEntreprise.split(' ').map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </h1>
            <p style={{ maxWidth: '400px', fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.8, marginBottom: '40px' }}>
              {siteData.descriptionCourte}
            </p>
            <a href="#services" className="l-btn-elegant">DÉCOUVRIR</a>
         </div>
      </section>

      {/* 2. SECTION HISTOIRE LOOKBOOK */}
      <section id="about" style={{ padding: '200px 10%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '100px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
             <img src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?q=80&w=1200" alt="Work" style={{ width: '100%', height: '600px', objectFit: 'cover' }} />
             <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', background: '#c5a059', color: '#000', padding: '40px', maxWidth: '300px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '10px' }}>SAVOIR-FAIRE</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>Une exigence de chaque instant pour des créations d'exception.</p>
             </div>
          </div>
          <div className="reveal">
            <h2 style={{ fontSize: '4rem', marginBottom: '40px', color: '#c5a059' }}>L'Art de <br/>{siteData.metier}</h2>
            <p style={{ fontSize: '1.4rem', lineHeight: '2', opacity: 0.7 }}>
              {siteData.descriptionLongue}
            </p>
          </div>
        </div>
      </section>

      {/* 3. SHOWROOM PRODUITS (ASPECT DÉFILÉ) */}
      <section id="services" style={{ paddingBottom: '200px' }}>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
           <h2 style={{ fontSize: '5rem', opacity: 0.1, letterSpacing: '20px', textTransform: 'uppercase', position: 'absolute', left: 0, right: 0 }}>COLLECTION</h2>
           <h3 style={{ position: 'relative', zIndex: 2, fontSize: '2rem', paddingTop: '40px' }}>Pièces de Signature</h3>
        </div>

        <div className="l-product-gallery">
          {products.map((p, i) => (
            <div key={i} className={i % 2 === 0 ? 'l-card-large reveal' : 'l-card-small reveal'} style={{ position: 'relative' }}>
              <div style={{ overflow: 'hidden', background: '#111' }}>
                <img src={p.img || p.image_url} alt={p.nom} style={{ width: '100%', height: i % 2 === 0 ? '600px' : '450px', objectFit: 'cover', transition: 'transform 1.5s ease', opacity: 0.8 }} 
                     className="l-img-hover" />
              </div>
              <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                   <h4 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{p.nom}</h4>
                   <p className="l-gold-text" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>{p.tag?.toUpperCase() || 'UNIQUE'}</p>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '300' }}>{p.prix}€</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CONTACT MINIMALISTE */}
      <section id="contact" style={{ borderTop: '1px solid rgba(197, 160, 89, 0.2)', padding: '150px 10%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
           <div>
              <h2 style={{ fontSize: '3rem', marginBottom: '30px' }}>Visitez Notre <span className="l-gold-text">Maison</span></h2>
              <p style={{ fontSize: '1.2rem', opacity: 0.5, marginBottom: '60px' }}>{siteData.adresse}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                 {Object.entries(siteData.horaires).map(([day, hours]) => (
                   <div key={day} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
                      <span style={{ textTransform: 'capitalize', fontSize: '0.8rem', opacity: 0.4 }}>{day}</span>
                      <div style={{ fontWeight: '700', marginTop: '5px' }}>{hours}</div>
                   </div>
                 ))}
              </div>
           </div>
           <div style={{ height: '650px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* BLOC ITINERAIRE LUXE */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', border: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '15px' }}>
                 <h4 style={{ color: '#c5a059', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '20px' }}>VOTRE PARCOURS D'EXCEPTION</h4>
                 <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <button 
                      onClick={handleGeolocate}
                      title="Utiliser ma position"
                      style={{ background: '#c5a059', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                       <MapPin size={20} color="#000" />
                    </button>
                    <input 
                      type="text" 
                      placeholder="Entrez votre adresse de départ..."
                      value={userAddress}
                      onChange={(e) => setUserAddress(e.target.value)}
                      style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 20px', color: '#fff', borderRadius: '10px', fontSize: '0.9rem' }} 
                    />
                 </div>
                 <button 
                   onClick={handleItinerary}
                   style={{ width: '100%', background: 'transparent', border: '1px solid #c5a059', color: '#c5a059', padding: '15px', fontWeight: '800', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.75rem', cursor: 'pointer', transition: '0.3s' }}
                 >
                    <Compass size={16} style={{ marginRight: '10px', verticalAlign: 'middle' }} /> ITINÉRAIRE
                 </button>
              </div>

              {/* MAP VISIBLE ET CLAIRE */}
              <div style={{ flex: 1, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(197, 160, 89, 0.2)' }}>
                 <iframe src={mapUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy"></iframe>
              </div>
           </div>
        </div>
      </section>

      <footer style={{ padding: '100px 0', textAlign: 'center', opacity: 0.3 }}>
        <div style={{ letterSpacing: '10px', fontSize: '0.7rem' }}>© 2026 {siteData.nomEntreprise.toUpperCase()}</div>
      </footer>
    </div>
  );
}
