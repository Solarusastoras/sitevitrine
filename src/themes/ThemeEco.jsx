import React, { useState } from 'react';
import { Leaf, Map, Compass, MapPin } from 'lucide-react';

export default function ThemeEco({ siteData, products }) {
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
      <div className="theme-eco">

         <section style={{ padding: '80px 10%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div className="e-hero-img-box" style={{ height: '70vh' }}>
               <img src={products[0]?.img || 'https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=1200&q=80'} alt="Eco Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
               <h1 style={{ fontSize: '4.5rem', fontFamily: 'serif', lineHeight: '1.1', marginBottom: '30px' }}>Naturellement<br />{siteData.nomEntreprise}</h1>
               <p style={{ fontSize: '1.4rem', opacity: 0.7, marginBottom: '40px', lineHeight: '1.6' }}>
                  {siteData.descriptionCourte}
               </p>
               <button style={{ background: 'var(--eco-primary)', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '50px', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer' }}>
                  Découvrir Notre Univers
               </button>
            </div>
         </section>

         <section id="about" style={{ padding: '120px 10%', textAlign: 'center' }}>
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
                  <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                     <div style={{ borderRadius: '20px', overflow: 'hidden', height: '350px', marginBottom: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', position: 'relative' }}>
                        <img src={p.img || p.image_url} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {p.tag && (
                           <div style={{ position: 'absolute', top: '15px', right: '15px', background: '#fff', color: 'var(--eco-primary)', padding: '5px 15px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '700', border: '1px solid var(--eco-primary)' }}>{p.tag}</div>
                        )}
                     </div>
                     <h3 style={{ fontSize: '1.5rem', fontFamily: 'serif', marginBottom: '10px' }}>{p.nom}</h3>
                     <p style={{ opacity: 0.6, fontSize: '0.95rem' }}>{p.desc || p.description}</p>
                  </div>
               ))}
            </div>
         </section>

         <section id="contact" style={{ padding: '100px 10%' }}>
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
                  <div style={{ marginBottom: '40px', background: 'rgba(45, 90, 39, 0.05)', padding: '25px', borderRadius: '25px', border: '1px solid rgba(45, 90, 39, 0.1)' }}>
                     <h4 style={{ fontSize: '0.8rem', letterSpacing: '4px', opacity: 0.5, marginBottom: '20px' }}>VOTRE CHEMIN</h4>
                     <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <button
                           onClick={handleGeolocate}
                           style={{ background: 'var(--eco-primary)', border: 'none', padding: '12px', borderRadius: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                           <MapPin size={20} color="#fff" />
                        </button>
                        <input
                           type="text"
                           placeholder="Départ..."
                           value={userAddress}
                           onChange={(e) => setUserAddress(e.target.value)}
                           style={{ flex: 1, background: '#fff', border: '1px solid #e0e0e0', padding: '12px 20px', borderRadius: '15px', fontSize: '14px', outline: 'none' }}
                        />
                     </div>
                     <button
                        onClick={handleItinerary}
                        style={{ width: '100%', background: 'var(--eco-primary)', color: '#fff', border: 'none', padding: '15px', borderRadius: '50px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                     >
                        <Compass size={18} /> ITINÉRAIRE
                     </button>
                  </div>

                  <div style={{ height: '400px', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
                     <iframe src={mapUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy"></iframe>
                  </div>
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
