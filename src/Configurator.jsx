import React, { useState, useEffect } from 'react';
import { PROFESSIONS } from './professions';
import { supabase } from './supabaseClient';

export default function Configurator({
  currentStyle, setCurrentStyle,
  currentMetier, setCurrentMetier,
  selectedEnterprise, setSelectedEnterprise,
  category,
  products = [],
  onUpdate,
  isAdminConnected, setIsAdminConnected,
  isClientConnected, setIsClientConnected,
  editingProduct, setEditingProduct
}) {
  const [entreprises, setEntreprises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [uploadingId, setUploadingId] = useState(null);

  // Default state for NEW product
  const [newProduct, setNewProduct] = useState({
    nom: '', prix: '', tag: '', desc: '', category: '', file: null, preview: null
  });

  const professionInfo = PROFESSIONS.find(p => p.name === currentMetier);
  const availableCategories = professionInfo?.productCategories || ["Article", "Service"];

  useEffect(() => {
    if (availableCategories.length > 0 && !newProduct.category) {
      setNewProduct(prev => ({ ...prev, category: availableCategories[0] }));
    }
  }, [availableCategories, currentMetier]);

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

  // Double Simulation Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Gagnoa0+') {
      setIsAdminConnected(true);
      setIsClientConnected(true);
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
          category: newProduct.category || (isRestaurant ? "Plat" : "Article")
        });

      if (error) throw error;

      setIsAdding(false);
      setNewProduct({ nom: '', prix: '', tag: '', desc: '', category: availableCategories[0], file: null, preview: null });
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
      // If setting a daily special, we might want to unset others (optional)
      if (field === 'is_daily_special' && value === true) {
        // Optionnel: unset other daily specials for this enterprise
      }

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
    switch (currentStyle) {
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
    <div className="configurator-wrapper">
      {/* 🏛️ HEADER PERMANENT DYNAMIQUE */}
      <div className="permanent-header" style={{
        background: h.bg,
        borderBottom: `1px solid ${h.border}`,
        color: h.text
      }}>
        {/* LIGNE 1: ADMIN - STYLES */}
        <div className="header-l1" style={{ borderBottom: h.l1Border }}>
          {/* Gauche: Admin uniquement */}
          <div className="left-side">
            <button
              onClick={() => setShowAdmin(!showAdmin)}
              className={`admin-toggle ${h.bg.includes('10') || h.bg.includes('15') ? 'inverted' : ''}`}
            >
              ⚙️
            </button>
          </div>

          {/* Centre: Sélecteur d'Univers */}
          <div className="universe-selector" style={{ background: h.bg.includes('10') || h.bg.includes('15') ? 'rgba(255,255,255,0.1)' : '#f5f5f5' }}>
            {[1, 2, 3, 4, 5].map((s, i) => (
              <button
                key={s}
                onClick={() => setCurrentStyle(s)}
                className={currentStyle === s ? 'active' : ''}
                style={{
                  background: currentStyle === s ? h.accent : 'transparent',
                  color: currentStyle === s ? (currentStyle === 1 ? '#000' : '#fff') : (h.bg.includes('10') || h.bg.includes('15') ? 'rgba(255,255,255,0.5)' : '#888'),
                }}
              >
                {styleNames[i].toUpperCase()}
              </button>
            ))}
          </div>

          <div className="spacer"></div>
        </div>

        {/* LIGNE 2: STATUT + NAVIGATION + CONNEXION */}
        <div className="header-l2">

          {/* GAUCHE: STATUT */}
          <div className="store-status">
            <div className="status-dot" style={{ background: storeStatus.color, boxShadow: `0 0 10px ${storeStatus.color}` }}></div>
            <span className="status-text" style={{ color: storeStatus.color }}>
              {storeStatus.status}
            </span>
          </div>

          {/* CENTRE: Navigation */}
          <nav>
            {['Accueil', 'Notre Histoire', 'Collections', 'Nous Contacter'].map((item, idx) => {
              const links = ['#', '#about', '#products', '#contact'];
              return (
                <a key={item} href={links[idx]} style={{ color: h.text }}
                  onMouseEnter={(e) => e.target.style.color = h.accent}
                  onMouseLeave={(e) => e.target.style.color = h.text}
                >
                  {item}
                </a>
              );
            })}
          </nav>

          {/* DROITE: Connexion */}
          <div className="btn-connexion">
            {!isClientConnected ? (
              <button onClick={() => setShowAdmin(true)} style={{
                background: h.btnBg, color: h.btnText,
                boxShadow: currentStyle === 1 ? '0 10px 20px rgba(197, 160, 89, 0.2)' : 'none'
              }}>
                CONNEXION 🔐
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="btn-logout"
                style={{ background: h.bg.includes('10') || h.bg.includes('15') ? 'rgba(255,255,255,0.1)' : '#f0f0f0', color: h.text }}
              >
                DECO. ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 🚀 BARRE DE GESTION BOUTIQUE (Plus basse pour ne pas chevaucher) */}
      {isClientConnected && (
        <div className="admin-bar">
          <button onClick={() => setIsAdding(true)} className="btn-add">➕ AJOUTER</button>
          <button onClick={() => setIsEditing(true)} className="btn-manage">📦 GÉRER</button>
        </div>
      )}

      {/* 🔐 PANNEAU ACCÈS / LOGIN (Modal) */}
      {showAdmin && (
        <div className="config-modal">
          <div className="modal-content">
            <button onClick={() => setShowAdmin(false)} className="btn-close">✕</button>

            {!isAdminConnected && !isClientConnected ? (
              <form onSubmit={handleLogin}>
                <h2>Connexion Espace</h2>
                <p>Veuillez entrer votre code d'accès</p>
                <input
                  type="password" placeholder="Code secret..."
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn-submit">ACCÉDER</button>
              </form>
            ) : (
              /* PANNEAU DE CONFIGURATION ADMIN (Uniquement si ADMIN) */
              <div className="admin-panel">
                <h2>PANNEAU ADMIN</h2>

                {isAdminConnected ? (
                  <div className="form-grid">
                    <div className="form-group">
                      <label>1. MÈTIER</label>
                      <select value={currentMetier} onChange={(e) => setCurrentMetier(e.target.value)}>
                        {PROFESSIONS.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>2. CLIENTS (BDD)</label>
                      <select
                        value={selectedEnterprise?.id || ''}
                        onChange={(e) => setSelectedEnterprise(entreprises.find(ent => ent.id === Number(e.target.value)))}
                      >
                        {entreprises.map(e => <option key={e.id} value={e.id}>{e.nom}</option>)}
                      </select>
                    </div>
                    <button onClick={handleLogout} className="btn-logout-full">DÉCONNEXION GLOBLALE</button>
                  </div>
                ) : (
                  <div className="client-info">
                    <p>Vous êtes connecté en tant que **CLIENT**.</p>
                    <button onClick={handleLogout} className="btn-logout-full">SE DÉCONNECTER</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ➕ MODAL AJOUT ARTICLE */}
      {isAdding && (
        <div className="article-modal">
          <div className="modal-card">
            <h2>Nouvel Article</h2>
            <div className="form-grid">

              <div className="img-upload-box">
                {newProduct.preview ? (
                  <img src={newProduct.preview} alt="Preview" />
                ) : (
                  <div className="placeholder">
                    <span>📸</span>
                    <span>PHOTO PRODUIT</span>
                  </div>
                )}
                <input
                  type="file" accept="image/*" capture="environment"
                  onChange={(e) => {
                    const f = e.target.files[0];
                    if (f) setNewProduct({ ...newProduct, file: f, preview: URL.createObjectURL(f) });
                  }}
                />
              </div>

              <div className="input-group">
                <label>Titre</label>
                <input placeholder="Ex: Croissant au Beurre" value={newProduct.nom} onChange={(e) => setNewProduct({ ...newProduct, nom: e.target.value })} />
              </div>

              <div className="row">
                <div className="input-group">
                  <label>Prix (€)</label>
                  <input placeholder="0.00" type="number" value={newProduct.prix} onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })} />
                </div>
                <div className="input-group">
                  <label>Catégorie</label>
                  <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                    {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label>Tag (Badge)</label>
                  <input placeholder="Ex: -50%" value={newProduct.tag} onChange={(e) => setNewProduct({ ...newProduct, tag: e.target.value })} style={{ color: '#ff4400' }} />
                </div>
              </div>

              <div className="input-group">
                <label>Description</label>
                <textarea
                  placeholder="Plus de détails sur l'article..."
                  value={newProduct.desc}
                  onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                />
              </div>

              <div className="actions">
                <button onClick={() => setIsAdding(false)} className="btn-cancel">ANNULER</button>
                <button onClick={handleAddProduct} className="btn-save">{loading ? 'ENREGISTREMENT...' : 'ENREGISTRER'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📦 MODAL GESTION CATALOGUE */}
      {isEditing && (
        <div className="catalogue-modal">
          <div className="modal-wide">
            <button onClick={() => setIsEditing(false)} className="btn-close-top">Fermer</button>
            <h2>Catalogue de {selectedEnterprise?.nom}</h2>
            <div className="products-list">
              {products.map(p => (
                <div key={p.id} className="product-row">
                  <div className="img-col">
                    <div className="img-preview">
                      <img src={p.image_url || p.img} alt={p.nom} />
                    </div>
                    <label className={`btn-photo-upload ${uploadingId === p.id ? 'loading' : ''}`}>
                      {uploadingId === p.id ? '...' : 'PHOTOS'}
                      <input type="file" accept="image/*" capture="environment" onChange={(e) => handlePhotoUpload(p.id, e.target.files[0])} />
                    </label>
                  </div>
                  <div className="fields-col">
                    <div className="field-group">
                      <label>Nom</label>
                      <input defaultValue={p.nom} onBlur={(e) => handleProductUpdate(p.id, 'nom', e.target.value)} />
                    </div>
                    <div className="row">
                      <div className="field-group">
                        <label>Prix</label>
                        <input type="number" defaultValue={p.prix} onBlur={(e) => handleProductUpdate(p.id, 'prix', e.target.value)} />
                      </div>
                      <div className="field-group">
                        <label>Catégorie</label>
                        <select defaultValue={p.category} onChange={(e) => handleProductUpdate(p.id, 'category', e.target.value)}>
                          {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="field-group">
                        <label>Tag</label>
                        <input defaultValue={p.tag} placeholder="-" onBlur={(e) => handleProductUpdate(p.id, 'tag', e.target.value)} style={{ color: '#ff4400' }} />
                      </div>
                    </div>
                  </div>
                  <div className="desc-col">
                    <label>Description</label>
                    <textarea
                      defaultValue={p.desc || p.description}
                      onBlur={(e) => handleProductUpdate(p.id, 'desc', e.target.value)}
                    />
                  </div>
                  <div className="delete-col">
                    <button
                      onClick={async () => {
                        if (window.confirm("Supprimer définitivement cet article ?")) {
                          await supabase.from('produits').delete().eq('id', p.id);
                          if (onUpdate) onUpdate();
                        }
                      }}
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
      {/* ⚡ MODAL ÉDITION RAPIDE (In-Situ) */}
      {editingProduct && (
        <div className="article-modal quick-edit">
          <div className="modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2>Modifier l'article</h2>
              <button onClick={() => setEditingProduct(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>
            <div className="form-grid">
              <div className="img-upload-box">
                <img src={editingProduct.image_url || editingProduct.img} alt="Preview" />
                <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(editingProduct.id, e.target.files[0])} />
                {uploadingId === editingProduct.id && <div className="loader-overlay">...</div>}
              </div>

              <div className="input-group">
                <label>Nom</label>
                <input 
                  defaultValue={editingProduct.nom || editingProduct.name} 
                  onBlur={(e) => handleProductUpdate(editingProduct.id, 'nom', e.target.value)} 
                />
              </div>

              <div className="row">
                <div className="input-group">
                  <label>Prix (€)</label>
                  <input 
                    type="number" defaultValue={editingProduct.prix} 
                    onBlur={(e) => handleProductUpdate(editingProduct.id, 'prix', e.target.value)} 
                  />
                </div>
                <div className="input-group">
                  <label>Catégorie</label>
                  <select 
                    defaultValue={editingProduct.category} 
                    onChange={(e) => handleProductUpdate(editingProduct.id, 'category', e.target.value)}
                  >
                    {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="actions">
                <button onClick={() => setEditingProduct(null)} className="btn-save" style={{ width: '100%' }}>TERMINER</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
