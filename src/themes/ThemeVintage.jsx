import React, { useState } from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';

export default function ThemeVintage({ siteData, products }) {
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
      <div className="theme-vintage">
         {/* La texture est maintenant gérée par le background CSS de la classe .theme-vintage */}

         <section style={{ padding: '40px 10%', display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '80px', alignItems: 'center', position: 'relative', zIndex: 10 }}>
            <div style={{ position: 'absolute', top: '-100px', left: '10%' }}>
               <h1 style={{ fontSize: '4rem', fontFamily: 'serif', letterSpacing: '2px', textTransform: 'uppercase', color: '#3d2b1f', marginBottom: '0' }}>{siteData.nomEntreprise}</h1>
               <div style={{ fontSize: '1rem', fontFamily: 'monospace', opacity: 0.6 }}>EST. 1985 • ARTISAN {siteData.metier.toUpperCase()}</div>
            </div>
            <div className="v-polaroid-container">
               <div className="v-polaroid-container">
                  <div className="v-polaroid" style={{ transform: 'rotate(-3deg)' }}>
                     <img src={products[0]?.img || 'https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=800&q=80'}
                        alt="Vintage Hero"
                        style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                     <div style={{ marginTop: '20px', fontFamily: 'monospace', textAlign: 'center', fontSize: '1.2rem' }}>
                        Authenticité & Savoir-faire

                     </div>
                  </div>
                  <div>
                  </div>
               </div>
               <h2 style={{ fontSize: '3rem', fontFamily: 'serif', marginBottom: '30px' }}>À Propos</h2>
               <p style={{ fontSize: '1.4rem', lineHeight: '2.2', fontFamily: 'monospace' }}>
                  {siteData.descriptionLongue}
               </p>
            </div>
         </section>

         <section style={{ padding: '80px 10%', position: 'relative', zIndex: 10 }}>
            <div style={{ textAlign: 'center', padding: '20px 0', borderTop: '2px solid #3d2b1f', borderBottom: '2px solid #3d2b1f', marginBottom: '80px' }}>
               <h3 style={{ fontSize: '2.5rem', fontFamily: 'serif' }}>~ Nos Articles de Référence ~</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px' }}>
               {products.map((p, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                     <div style={{ border: '1px solid rgba(0,0,0,0.1)', background: '#fff', padding: '10px', boxShadow: '5px 5px 0px rgba(0,0,0,0.05)', position: 'relative' }}>
                        <img src={p.img || p.image_url} alt={p.nom} style={{ width: '100%', height: '250px', objectFit: 'cover', filter: 'sepia(0.2)' }} />
                        {p.tag && (
                           <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#8b5a2b', color: '#fff', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '900', transform: 'rotate(15deg)', border: '2px dashed #fff', lineHeight: '1', textAlign: 'center', padding: '5px' }}>
                              {p.tag.toUpperCase()}
                           </div>
                        )}
                     </div>
                     <h4 style={{ fontSize: '1.8rem', marginTop: '20px', fontFamily: 'serif' }}>{p.nom}</h4>
                     <p style={{ fontFamily: 'monospace', opacity: 0.7, fontSize: '0.9rem', marginTop: '5px' }}>{p.desc}</p>
                  </div>
               ))}
            </div>
         </section>

         <section style={{ padding: '80px 10%', position: 'relative', zIndex: 10 }}>
            <div className="v-gazette-border">
               <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <span style={{ fontSize: '12px', letterSpacing: '4px', display: 'block', marginBottom: '10px' }}>ÉDITION SPÉCIALE • 2026</span>
                  <h2 style={{ fontSize: '3rem', fontFamily: 'serif' }}>L'ALMANACH DE LA BOUTIQUE</h2>
                  <div style={{ height: '4px', borderTop: '1px solid #3d2b1f', borderBottom: '1px solid #3d2b1f', marginTop: '10px' }}></div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
                  <div>
                     <h3 style={{ fontSize: '2rem', fontFamily: 'serif', marginBottom: '20px' }}>NOTRE COMPTOIR</h3>
                     <p style={{ fontSize: '1.5rem', fontFamily: 'monospace', lineHeight: '1.8' }}>
                        📍 {siteData.adresse}
                     </p>
                     <p style={{ marginTop: '20px', fontFamily: 'monospace', opacity: 0.8 }}>
                        Venez nous rendre visite pour découvrir nos pièces rares et accessoires d'époque.
                     </p>
                     <div style={{ marginTop: '40px', background: 'rgba(255,255,255,0.4)', padding: '20px', border: '1px solid #3d2b1f', borderRadius: '4px' }}>
                        <h4 style={{ fontSize: '1rem', fontFamily: 'serif', marginBottom: '15px' }}>~ CALCULER MON ITINÉRAIRE ~</h4>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                           <button 
                             onClick={handleGeolocate}
                             style={{ background: '#3d2b1f', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                           >
                              <MapPin size={18} color="#fff" />
                           </button>
                           <input 
                             type="text" 
                             placeholder="D'où partez-vous ?"
                             value={userAddress}
                             onChange={(e) => setUserAddress(e.target.value)}
                             style={{ flex: 1, background: 'transparent', border: '1px solid #3d2b1f', padding: '10px', fontFamily: 'monospace', fontSize: '12px' }} 
                           />
                        </div>
                        <button 
                           onClick={handleItinerary}
                           style={{ width: '100%', background: '#3d2b1f', color: '#fff', border: 'none', padding: '12px', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '12px', cursor: 'pointer', fontFamily: 'serif' }}
                        >
                           ITINÉRAIRE
                        </button>
                     </div>

                     <div style={{ height: '300px', marginTop: '20px', border: '1px solid #3d2b1f', filter: 'grayscale(1)' }}>
                        <iframe src={mapUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy"></iframe>
                     </div>
                  </div>
                  <div>
                     <h3 style={{ fontSize: '2rem', fontFamily: 'serif', marginBottom: '20px' }}>SERVICES & HEURES</h3>
                     <ul style={{ listStyle: 'none', padding: 0 }}>
                        {Object.entries(siteData.horaires).map(([day, hours]) => (
                           <li key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px dotted #3d2b1f', fontFamily: 'monospace', fontSize: '1.1rem' }}>
                              <strong style={{ textTransform: 'capitalize' }}>{day} :</strong> {hours}
                           </li>
                        ))}
                     </ul>
                     <div style={{ marginTop: '50px', textAlign: 'center' }}>
                        <div style={{
                           border: '4px solid #8b5a2b', color: '#8b5a2b', display: 'inline-block', padding: '10px 30px',
                           transform: 'rotate(-10deg)', fontSize: '1.5rem', fontWeight: '900', letterSpacing: '2px'
                        }}>APPROUVÉ</div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <footer style={{ padding: '60px 0', textAlign: 'center', fontFamily: 'serif', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <p>{siteData.nomEntreprise.toUpperCase()} • DEPUIS 1985 • {siteData.metier.toUpperCase()}</p>
         </footer>
      </div>
   );
}
