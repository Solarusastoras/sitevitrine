import React from 'react';
import { MapPin } from 'lucide-react';

export default function ThemeVintage({ siteData, products }) {
  if (!siteData) return null;

  return (
    <div className="theme-vintage">
      <div className="v-paper-texture"></div>
      
      <header style={{ padding: '60px 0', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'serif', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '10px' }}>
          {siteData.nomEntreprise}
        </h1>
        <div style={{ fontSize: '1.2rem', fontFamily: 'monospace', fontStyle: 'italic', opacity: 0.7 }}>
          *** Est. Depuis 1985 • {siteData.metier.toUpperCase()} ***
        </div>
      </header>

      <section style={{ padding: '40px 10%', display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '80px', alignItems: 'center', position: 'relative', zIndex: 10 }}>
          <div className="v-polaroid-container">
             <div className="v-polaroid" style={{ transform: 'rotate(-3deg)' }}>
                <img src={products[0]?.img || 'https://images.unsplash.com/photo-1542295669297-4d352b042bca?w=800&q=80'} 
                     alt="Vintage Hero" 
                     style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
                <div style={{ marginTop: '20px', fontFamily: 'monospace', textAlign: 'center', fontSize: '1.2rem' }}>
                  Authenticité & Savoir-faire
                </div>
             </div>
          </div>
          <div>
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
               <div style={{ border: '1px solid rgba(0,0,0,0.1)', background: '#fff', padding: '10px', boxShadow: '5px 5px 0px rgba(0,0,0,0.05)' }}>
                  <img src={p.img} alt={p.nom} style={{ width: '100%', height: '250px', objectFit: 'cover', filter: 'sepia(0.2)' }} />
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
                  <div style={{ height: '300px', marginTop: '40px', border: '1px solid #3d2b1f', filter: 'grayscale(1)' }}>
                     <iframe src={siteData.mapsIframeUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy"></iframe>
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
