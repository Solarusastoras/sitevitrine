import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { PROFESSIONS } from './professions'
import { THEME_MATRIX } from './themes'
import EditorSidebar from './Editor.jsx'

function App() {
  const { id } = useParams();
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // 1. Fetching logic
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data, error } = await supabase
        .from('entreprises')
        .select('*')
        .eq('id', Number(id))
        .single();

      if (data) {
        const parsedHoraires = typeof data.horaires === 'string' ? JSON.parse(data.horaires) : data.horaires;
        const coords = typeof data.coordonnees === 'string' ? JSON.parse(data.coordonnees) : data.coordonnees;
        
        setSiteData({
          ...data,
          selectedStyle: data.selected_style || 1,
          nomEntreprise: data.nom,
          metier: data.secteur,
          descriptionCourte: data.description || "Votre professionnel de confiance.",
          descriptionLongue: data.description || "Bienvenue sur notre site vitrine.",
          horaires: parsedHoraires || {},
          mapsIframeUrl: `https://maps.google.com/maps?q=${coords?.lat || data.adresse}&z=15&output=embed`
        });
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  // 2. Theme logic (MUST BE BEFORE EARLY RETURNS)
  useEffect(() => {
    if (!siteData) return;

    const metierName = siteData.metier || "";
    const professionData = PROFESSIONS.find(p => metierName.toLowerCase().includes(p.name.toLowerCase())) || { category: "SERVICES" };
    const category = professionData.category;
    const theme = THEME_MATRIX[category][siteData.selectedStyle || 1];
    
    if (!theme) return;
    
    const root = document.documentElement;
    document.body.setAttribute('data-theme', siteData.selectedStyle || 1);
    
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    document.body.style.transition = 'all 0.5s ease';
  }, [siteData]);

  if (loading) return (
    <div style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', fontFamily:'var(--font-title)'}}>
      🌟 Préparation de votre vitrine premium...
    </div>
  );

  if (!siteData) return (
    <div style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem'}}>
       😕 Site introuvable sur Supabase (ID: {id})
    </div>
  );

  const { 
    selectedStyle,
    nomEntreprise, 
    metier,
    descriptionCourte, 
    descriptionLongue, 
    horaires, 
    mapsIframeUrl, 
    telephone, 
    email, 
    adresse 
  } = siteData;

  return (
    <div className="app-container" style={{ marginLeft: isEditorOpen ? '350px' : '0', transition: 'margin 0.4s ease' }}>
      <EditorSidebar siteData={siteData} setSiteData={setSiteData} isOpen={isEditorOpen} setIsOpen={setIsEditorOpen} />

      {/* NAVBAR */}
      <nav>
        <div className="container nav-content">
          <div className="logo">{nomEntreprise}</div>
          <div className="nav-links">
            <a href="#about" style={{marginRight: '1.5rem', textDecoration: 'none', color: 'inherit'}}>À propos</a>
            <a href="#services" style={{marginRight: '1.5rem', textDecoration: 'none', color: 'inherit'}}>Prestations</a>
            <a href="#contact" style={{textDecoration: 'none', color: 'inherit', fontWeight: '800'}}>Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero reveal">
        <div className="container">
          <h1 key={nomEntreprise}>{nomEntreprise}</h1>
          <p className="hero-slogan">{descriptionCourte}</p>
          <a href="#contact" className="btn-primary">Prendre Contact</a>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="container reveal">
        <h2 style={{borderLeft: '5px solid var(--accent)', paddingLeft: '1rem'}}>{metier}</h2>
        <div style={{marginTop:'2rem', maxWidth:'80%rem'}}>
          <p style={{fontSize: '1.2rem', opacity: 0.8}}>{descriptionLongue}</p>
        </div>
      </section>

      {/* SCHEDULE & CONTACT */}
      <section id="contact" className="container">
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem'}}>
          <div className="reveal">
            <h2 style={{marginBottom: '2rem'}}>Horaires d'Ouverture</h2>
            <div className="horaires-wrapper">
              <table className="horaires-table">
                <tbody>
                  {Object.entries(horaires).map(([jour, heures]) => (
                    <tr key={jour}>
                      <td className="horaires-day" style={{textTransform:'capitalize'}}>{jour}</td>
                      <td style={{textAlign: 'right'}}>{heures}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="reveal" style={{animationDelay: '0.3s'}}>
            <h2 style={{marginBottom: '2rem'}}>Coordonnées</h2>
            <div style={{display:'flex', gap:'1rem', flexDirection:'column'}}>
               <p>📍 {adresse}</p>
               <p>📞 {telephone}</p>
               {email && <p>✉️ {email}</p>}
            </div>
            <div className="map-container" style={{marginTop:'2rem'}}>
              <iframe
                title="Google Maps"
                src={mapsIframeUrl}
                width="100%" height="100%" allowFullScreen="" loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container" style={{textAlign:'center'}}>
          <p>© {new Date().getFullYear()} {nomEntreprise}.</p>
          <p style={{fontSize:'0.8rem', opacity:0.5, marginTop:'1rem'}}>Propulsé par votre Générateur Supabase</p>
        </div>
      </footer>
    </div>
  )
}

export default App
