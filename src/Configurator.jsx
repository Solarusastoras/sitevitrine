import React, { useState, useEffect } from 'react';
import { PROFESSIONS } from './professions';
import { supabase } from './supabaseClient';

export default function Configurator({
  currentStyle, setCurrentStyle,
  currentMetier, setCurrentMetier,
  selectedEnterprise, setSelectedEnterprise,
  category,
  products = [],
  onUpdate
}) {
  const [entreprises, setEntreprises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [isClientConnected, setIsClientConnected] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [uploadingId, setUploadingId] = useState(null);

  // Double Simulation Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Gagnoa0+') {
      setIsAdminConnected(true);
      setIsClientConnected(true); // L'admin peut tout faire
      setShowAdmin(false);
      setPassword('');
    } else if (password === '0000') {
      setIsClientConnected(true);
      setShowAdmin(false);
      setPassword('');
    } else {
      alert("Code incorrect.");
    }
  };

  const handleLogout = () => {
    setIsAdminConnected(false);
    setIsClientConnected(false);
    setShowAdmin(false);
  };

  // Default state for NEW product
  const [newProduct, setNewProduct] = useState({
    nom: '', prix: '', tag: '', desc: '', file: null, preview: null
  });

  const isRestaurant = ["restaurant", "bistro", "café", "brasserie", "auberge"].some(word => currentMetier.toLowerCase().includes(word));

  const styleNames = isRestaurant
    ? ["Premium", "Classique", "Moderne", "Rustique", "Bistro"]
    : ["Luxe", "Vintage", "Minimal", "Moderne", "Eco"];

  // Fetch enterprises whenever the profession (metier) changes
  useEffect(() => {
    async function fetchEntreprises() {
      if (!currentMetier) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('entreprises')
        .select('*')
        .ilike('secteur', `%${currentMetier}%`);

      if (data) {
        setEntreprises(data);
        if (data.length > 0) setSelectedEnterprise(data[0]);
        else setSelectedEnterprise(null);
      }
      setLoading(false);
    }
    fetchEntreprises();
  }, [currentMetier]);

  // Handle Product Addition to Supabase
  const handleAddProduct = async () => {
    if (!newProduct.nom || !selectedEnterprise) return;
    setLoading(true);

    try {
      let finalImageUrl = "";

      // 1. Upload Photo if selected
      if (newProduct.file) {
        const fileName = `${selectedEnterprise.id}/new_${Date.now()}.${newProduct.file.name.split('.').pop()}`;
        await supabase.storage.from('img').upload(fileName, newProduct.file);
        const { data: { publicUrl } } = supabase.storage.from('img').getPublicUrl(fileName);
        finalImageUrl = publicUrl;
      }

      // 2. Insert into DB
      const { error } = await supabase
        .from('produits')
        .insert({
          nom: newProduct.nom,
          prix: newProduct.prix,
          tag: newProduct.tag,
          desc: newProduct.desc,
          image_url: finalImageUrl,
          entreprise_id: selectedEnterprise.id,
          category: isRestaurant ? "Plat" : "Article"
        });

      if (error) throw error;

      setIsAdding(false);
      setNewProduct({ nom: '', prix: '', tag: '', desc: '', file: null, preview: null });
      if (onUpdate) onUpdate();
    } catch (err) {
      alert("Erreur ajout : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Product Update (Text fields)
  const handleProductUpdate = async (productId, field, value) => {
    try {
      const { error } = await supabase
        .from('produits')
        .update({ [field]: value })
        .eq('id', productId);
      if (error) throw error;
      if (onUpdate) onUpdate();
    } catch (err) { console.error(err); }
  };

  // Handle Photo Upload (Existing Product)
  const handlePhotoUpload = async (productId, file) => {
    if (!file) return;
    setUploadingId(productId);
    try {
      const fileName = `${selectedEnterprise.id}/${productId}_${Date.now()}.${file.name.split('.').pop()}`;
      await supabase.storage.from('img').upload(fileName, file, { upsert: true });
      const { data: { publicUrl } } = supabase.storage.from('img').getPublicUrl(fileName);
      await supabase.from('produits').update({ image_url: publicUrl }).eq('id', productId);
      if (onUpdate) onUpdate();
    } catch (err) { alert(err.message); }
    finally { setUploadingId(null); }
  };

  // Logique de statut d'ouverture
  const getStoreStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const currentTime = currentHour * 60 + currentMin;

    const openTime = 8 * 60;    // 08:00
    const closeTime = 20 * 60 + 30; // 20:30

    if (currentTime >= openTime && currentTime < closeTime) {
      return { status: "OUVERT", color: "#00cc66" };
    } else {
      let diff;
      if (currentTime < openTime) {
        diff = openTime - currentTime;
      } else {
        diff = (24 * 60 - currentTime) + openTime;
      }
      const h = Math.floor(diff / 60);
      const m = diff % 60;
      const timeStr = h > 0 ? `${h}h ${m}min` : `${m}min`;
      return { status: `OUVRE DANS ${timeStr}`, color: "#ff9900" };
    }
  };

  const storeStatus = getStoreStatus();

  const getHeaderStyles = () => {
    switch(currentStyle) {
      case 1: // LUXE
        return { 
          bg: 'rgba(10, 10, 10, 0.98)', text: '#fff', border: 'rgba(197, 160, 89, 0.3)', 
          accent: '#c5a059', l1Border: '1px solid rgba(197, 160, 89, 0.2)', btnBg: '#c5a059', btnText: '#000' 
        };
      case 2: // VINTAGE
        return { 
          bg: 'rgba(252, 245, 230, 0.98)', text: '#3d2b1f', border: '#3d2b1f', 
          accent: '#8b5a2b', l1Border: '2px solid #3d2b1f', btnBg: '#3d2b1f', btnText: '#fff' 
        };
      case 3: // MINIMAL
        return { 
          bg: 'rgba(255, 255, 255, 0.98)', text: '#000', border: '#eee', 
          accent: '#000', l1Border: '1px solid #000', btnBg: '#000', btnText: '#fff' 
        };
      case 4: // URBAIN
        return { 
          bg: 'rgba(15, 15, 15, 0.98)', text: '#fff', border: '#333', 
          accent: '#fff', l1Border: '2px solid #fff', btnBg: '#fff', btnText: '#000' 
        };
      case 5: // ECO
        return { 
          bg: 'rgba(240, 244, 238, 0.98)', text: '#2d5a27', border: 'rgba(45, 90, 39, 0.2)', 
          accent: '#2d5a27', l1Border: '1px solid rgba(45, 90, 39, 0.4)', btnBg: '#2d5a27', btnText: '#fff' 
        };
      default:
        return { bg: '#fff', text: '#000', border: '#eee', accent: '#000', l1Border: '1px solid #eee', btnBg: '#111', btnText: '#fff' };
    }
  };

  const h = getHeaderStyles();

  return (
    <>
      {/* 🏛️ HEADER PERMANENT DYNAMIQUE */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 10000, background: h.bg, backdropFilter: 'blur(30px)',
        borderBottom: `1px solid ${h.border}`, display: 'flex', flexDirection: 'column',
        boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
        color: h.text, transition: 'all 0.5s ease'
      }}>
        {/* LIGNE 1: ADMIN - STYLES */}
        <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', borderBottom: h.l1Border }}>
          {/* Gauche: Admin uniquement */}
          <div style={{ width: '80px' }}>
            <button 
              onClick={() => setShowAdmin(!showAdmin)}
              style={{ background: 'transparent', border: 'none', opacity: 0.3, cursor: 'pointer', fontSize: '1.2rem', filter: h.bg.includes('10') || h.bg.includes('15') ? 'invert(1)' : 'none' }}
            >
              ⚙️
            </button>
          </div>

          {/* Centre: Sélecteur d'Univers */}
          <div style={{ display: 'flex', gap: '4px', background: h.bg.includes('10') || h.bg.includes('15') ? 'rgba(255,255,255,0.1)' : '#f5f5f5', padding: '4px', borderRadius: '50px' }}>
            {[1, 2, 3, 4, 5].map((s, i) => (
              <button key={s} onClick={() => setCurrentStyle(s)} style={{ 
                padding: '6px 15px', borderRadius: '40px', border: 'none', 
                background: currentStyle === s ? h.accent : 'transparent',
                color: currentStyle === s ? (currentStyle === 1 ? '#000' : '#fff') : (h.bg.includes('10') || h.bg.includes('15') ? 'rgba(255,255,255,0.5)' : '#888'),
                fontWeight: '900', fontSize: '0.6rem', cursor: 'pointer', transition: '0.2s'
              }}>
                {styleNames[i].toUpperCase()}
              </button>
            ))}
          </div>

          <div style={{ width: '80px' }}></div>
        </div>

        {/* LIGNE 2: STATUT + NAVIGATION + CONNEXION */}
        <div style={{ height: '60px', display: 'flex', alignItems: 'center', padding: '0 40px' }}>
          
          {/* GAUCHE: STATUT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '150px' }}>
             <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: storeStatus.color, boxShadow: `0 0 10px ${storeStatus.color}` }}></div>
             <span style={{ fontSize: '1rem', fontWeight: '900', color: storeStatus.color, textTransform: 'uppercase', letterSpacing: '1px' }}>
               {storeStatus.status}
             </span>
          </div>

          {/* CENTRE: Navigation */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '40px' }}>
            {['Accueil', 'Notre Histoire', 'Collections', 'Nous Contacter'].map((item, idx) => {
              const links = ['#', '#about', '#products', '#contact'];
              return (
                <a key={item} href={links[idx]} style={{ 
                  textDecoration: 'none', color: h.text, fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7, transition: '0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = h.accent}
                onMouseLeave={(e) => e.target.style.color = h.text}
                >
                  {item}
                </a>
              );
            })}
          </div>

          {/* DROITE: Connexion */}
          <div style={{ minWidth: '150px', display: 'flex', justifyContent: 'flex-end' }}>
            {!isClientConnected ? (
              <button onClick={() => setShowAdmin(true)} style={{ 
                background: h.btnBg, color: h.btnText, border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: '900', fontSize: '0.86rem', cursor: 'pointer',
                boxShadow: currentStyle === 1 ? '0 10px 20px rgba(197, 160, 89, 0.2)' : 'none'
              }}>
                CONNEXION 🔐
              </button>
            ) : (
              <button onClick={handleLogout} style={{ background: h.bg.includes('10') || h.bg.includes('15') ? 'rgba(255,255,255,0.1)' : '#f0f0f0', color: h.text, border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '900', fontSize: '0.7rem' }}>DECO. ✕</button>
            )}
          </div>
        </div>
      </div>



      {/* 🚀 BARRE DE GESTION BOUTIQUE (Plus basse pour ne pas chevaucher) */}
      {isClientConnected && (
        <div style={{
          position: 'fixed', top: '125px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 9000, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)',
          padding: '8px 10px', borderRadius: '100px', display: 'flex',
          gap: '10px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
        }}>
          <button onClick={() => setIsAdding(true)} style={{ background: '#00cc66', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '50px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer' }}>➕ AJOUTER</button>
          <button onClick={() => setIsEditing(true)} style={{ background: '#333', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '50px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer' }}>📦 GÉRER</button>
        </div>
      )}

      {/* 🔐 PANNEAU ACCÈS / LOGIN (Modal) */}
      {showAdmin && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 20000, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#111', color: '#fff', padding: '60px', borderRadius: '50px',
            width: '90%', maxWidth: '500px', border: '1px solid #333', position: 'relative',
            textAlign: 'center'
          }}>
            <button onClick={() => setShowAdmin(false)} style={{ position: 'absolute', top: '30px', right: '30px', background: 'transparent', color: '#fff', opacity: 0.5, border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>✕</button>

            {!isAdminConnected && !isClientConnected ? (
              <form onSubmit={handleLogin}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '10px' }}>Connexion Espace</h2>
                <p style={{ opacity: 0.5, marginBottom: '40px', fontSize: '0.9rem' }}>Veuillez entrer votre code d'accès</p>
                <input
                  type="password" placeholder="Code secret..."
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', background: '#222', border: '1px solid #333', color: '#fff', padding: '20px', borderRadius: '25px', fontSize: '1.2rem', textAlign: 'center', fontWeight: '900', outline: 'none', marginBottom: '20px' }}
                />
                <button type="submit" style={{ width: '100%', background: '#fff', color: '#000', padding: '20px', borderRadius: '200px', fontWeight: '900', cursor: 'pointer', border: 'none' }}>ACCÉDER</button>
              </form>
            ) : (
              /* PANNEAU DE CONFIGURATION ADMIN (Uniquement si ADMIN) */
              <div style={{ textAlign: 'left' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '30px', color: '#00ccff' }}>PANNEAU ADMIN</h2>

                {isAdminConnected ? (
                  <div style={{ display: 'grid', gap: '30px' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', opacity: 0.5, fontWeight: '900', textTransform: 'uppercase' }}>1. MÈTIER</label>
                      <select value={currentMetier} onChange={(e) => setCurrentMetier(e.target.value)} style={{ width: '100%', background: 'transparent', color: '#fff', border: 'none', borderBottom: '1px solid #333', padding: '15px 0', fontSize: '1.1rem', fontWeight: '700', outline: 'none' }}>
                        {PROFESSIONS.map(p => <option key={p.name} value={p.name} style={{ color: '#000' }}>{p.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', opacity: 0.5, fontWeight: '900', textTransform: 'uppercase' }}>2. CLIENTS (BDD)</label>
                      <select
                        value={selectedEnterprise?.id || ''}
                        onChange={(e) => setSelectedEnterprise(entreprises.find(ent => ent.id === Number(e.target.value)))}
                        style={{ width: '100%', background: 'transparent', color: '#fff', border: 'none', borderBottom: '1px solid #333', padding: '15px 0', fontSize: '1.1rem', fontWeight: '700', outline: 'none' }}
                      >
                        {entreprises.map(e => <option key={e.id} value={e.id} style={{ color: '#000' }}>{e.nom}</option>)}
                      </select>
                    </div>
                    <button onClick={handleLogout} style={{ marginTop: '20px', background: '#ff4444', color: '#fff', padding: '15px', borderRadius: '20px', border: 'none', fontWeight: '900', cursor: 'pointer' }}>DÉCONNEXION GLOBLALE</button>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ marginBottom: '20px' }}>Vous êtes connecté en tant que **CLIENT**.</p>
                    <button onClick={handleLogout} style={{ background: '#333', color: '#fff', padding: '15px 30px', borderRadius: '50px', border: 'none', fontWeight: '900', cursor: 'pointer' }}>SE DÉCONNECTER</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ➕ MODAL AJOUT ARTICLE */}
      {isAdding && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 11000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{
            background: '#fff', width: '95%', maxWidth: '600px', maxHeight: '95vh',
            borderRadius: '40px', padding: '40px', position: 'relative', overflowY: 'auto',
            boxShadow: '0 30px 100px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '30px' }}>Nouvel Article</h2>
            <div style={{ display: 'grid', gap: '25px' }}>

              <div style={{ height: '220px', background: '#f8f8f8', borderRadius: '25px', overflow: 'hidden', border: '3px dashed #eee', position: 'relative' }}>
                {newProduct.preview ? (
                  <img src={newProduct.preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', opacity: 0.2, fontWeight: '900', flexDirection: 'column', gap: '10px' }}>
                    <span style={{ fontSize: '2rem' }}>📸</span>
                    <span>PHOTO PRODUIT</span>
                  </div>
                )}
                <input
                  type="file" accept="image/*" capture="environment"
                  onChange={(e) => {
                    const f = e.target.files[0];
                    if (f) setNewProduct({ ...newProduct, file: f, preview: URL.createObjectURL(f) });
                  }}
                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: '900', opacity: 0.4, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Titre</label>
                <input placeholder="Ex: Croissant au Beurre" value={newProduct.nom} onChange={(e) => setNewProduct({ ...newProduct, nom: e.target.value })} style={{ width: '100%', padding: '18px', borderRadius: '15px', border: '2px solid #eee', fontSize: '1rem', fontWeight: '700', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: '900', opacity: 0.4, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Prix (€)</label>
                  <input placeholder="0.00" type="number" value={newProduct.prix} onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })} style={{ width: '100%', padding: '18px', borderRadius: '15px', border: '2px solid #eee', fontSize: '1rem', fontWeight: '700', outline: 'none' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: '900', opacity: 0.4, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Tag (Badge)</label>
                  <input placeholder="Ex: -50%" value={newProduct.tag} onChange={(e) => setNewProduct({ ...newProduct, tag: e.target.value })} style={{ width: '100%', padding: '18px', borderRadius: '15px', border: '2px solid #eee', fontSize: '1rem', fontWeight: '700', outline: 'none', color: '#ff4400' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: '900', opacity: 0.4, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Description</label>
                <textarea
                  placeholder="Plus de détails sur l'article..."
                  value={newProduct.desc}
                  onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                  style={{ width: '100%', padding: '18px', borderRadius: '15px', border: '2px solid #eee', fontSize: '1rem', fontWeight: '700', outline: 'none', minHeight: '100px', resize: 'none', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button onClick={() => setIsAdding(false)} style={{ flex: 1, padding: '20px', borderRadius: '20px', border: 'none', background: '#f5f5f5', fontWeight: '900', cursor: 'pointer', color: '#666' }}>ANNULER</button>
                <button onClick={handleAddProduct} style={{ flex: 2, padding: '20px', borderRadius: '20px', border: 'none', background: '#00cc66', color: '#fff', fontWeight: '900', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,204,102,0.3)' }}>{loading ? 'ENREGISTREMENT...' : 'ENREGISTRER'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📦 MODAL GESTION CATALOGUE */}
      {isEditing && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 11000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', width: '95%', maxWidth: '1100px', maxHeight: '90vh', borderRadius: '40px', padding: '40px', overflowY: 'auto', position: 'relative' }}>
            <button onClick={() => setIsEditing(false)} style={{ position: 'absolute', top: '30px', right: '30px', background: '#f5f5f5', padding: '10px 20px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: '800' }}>Fermer</button>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '40px' }}>Catalogue de {selectedEnterprise?.nom}</h2>
            <div style={{ display: 'grid', gap: '25px' }}>
              {products.map(p => (
                <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1.5fr 80px', gap: '30px', alignItems: 'start', padding: '30px', background: '#fcfcfc', borderRadius: '30px', border: '1px solid #eee' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '140px', height: '140px', borderRadius: '20px', overflow: 'hidden', marginBottom: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                      <img src={p.image_url || p.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <label style={{ display: 'block', background: uploadingId === p.id ? '#eee' : '#000', color: '#fff', padding: '10px', fontSize: '0.7rem', borderRadius: '10px', cursor: 'pointer', fontWeight: '800' }}>
                      {uploadingId === p.id ? '...' : 'PHOTOS'}
                      <input type="file" accept="image/*" capture="environment" onChange={(e) => handlePhotoUpload(p.id, e.target.files[0])} style={{ display: 'none' }} />
                    </label>
                  </div>
                  <div style={{ display: 'grid', gap: '15px' }}>
                    <div>
                      <label style={{ fontSize: '0.65rem', opacity: 0.4, fontWeight: '900', textTransform: 'uppercase' }}>Nom</label>
                      <input defaultValue={p.nom} onBlur={(e) => handleProductUpdate(p.id, 'nom', e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #eee', fontWeight: '700', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.65rem', opacity: 0.4, fontWeight: '900', textTransform: 'uppercase' }}>Prix</label>
                        <input type="number" defaultValue={p.prix} onBlur={(e) => handleProductUpdate(p.id, 'prix', e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #eee', fontWeight: '700', outline: 'none' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.65rem', opacity: 0.4, fontWeight: '900', textTransform: 'uppercase' }}>Tag</label>
                        <input defaultValue={p.tag} placeholder="-" onBlur={(e) => handleProductUpdate(p.id, 'tag', e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #eee', fontWeight: '700', color: '#ff4400', outline: 'none' }} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.65rem', opacity: 0.4, fontWeight: '900', textTransform: 'uppercase' }}>Description</label>
                    <textarea
                      defaultValue={p.desc || p.description}
                      onBlur={(e) => handleProductUpdate(p.id, 'desc', e.target.value)}
                      style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #eee', fontWeight: '600', minHeight: '100px', outline: 'none', resize: 'none', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <button
                      onClick={async () => {
                        if (window.confirm("Supprimer définitivement cet article ?")) {
                          await supabase.from('produits').delete().eq('id', p.id);
                          if (onUpdate) onUpdate();
                        }
                      }}
                      style={{ background: '#ffeeee', color: '#ff0000', border: 'none', width: '50px', height: '50px', borderRadius: '15px', cursor: 'pointer', fontWeight: '800', fontSize: '1.2rem' }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
