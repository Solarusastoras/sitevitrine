import React, { useState } from 'react';
import { PROFESSIONS } from './professions';
import { supabase } from './supabaseClient';

export default function EditorSidebar({ siteData, setSiteData, isOpen, setIsOpen }) {
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setSiteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('entreprises')
      .update({
        nom: siteData.nomEntreprise,
        secteur: siteData.metier,
        description: siteData.descriptionLongue,
        adresse: siteData.adresse,
        telephone: siteData.telephone,
        email: siteData.email,
        selected_style: siteData.selectedStyle
      })
      .eq('id', siteData.id);

    if (error) alert("Erreur lors de la sauvegarde : " + error.message);
    else alert("✅ Site mis à jour sur Supabase !");
    setSaving(false);
  };

  if (!isOpen) return (
    <button 
      onClick={() => setIsOpen(true)}
      style={{
        position: 'fixed', bottom: '20px', left: '20px', zIndex: 10001,
        padding: '12px 20px', borderRadius: '50px', border: 'none',
        background: '#000', color: 'white', cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)', fontWeight: 'bold'
      }}
    >
      ⚙️ Modifier le site (Admin)
    </button>
  );

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '350px', height: '100vh',
      background: 'white', boxShadow: '2px 0 20px rgba(0,0,0,0.2)', zIndex: 10000,
      padding: '2rem', overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem' }}>DASHBOARD SUPABASE</h2>
        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Style Visuel (Supabase)</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1,2,3,4,5].map(s => (
            <button key={s} onClick={() => handleChange('selectedStyle', s)} style={{
                flex: 1, padding: '8px', borderRadius: '5px',
                border: siteData.selectedStyle === s ? '2px solid black' : '1px solid #ccc',
                background: siteData.selectedStyle === s ? '#eee' : 'white',
                cursor: 'pointer', fontWeight: 'bold'
              }}>{s}</button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nom de l'entreprise</label>
        <input type="text" value={siteData.nomEntreprise} onChange={(e) => handleChange('nomEntreprise', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Secteur / Métier</label>
        <select value={siteData.metier} onChange={(e) => handleChange('metier', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
          {PROFESSIONS.map(p => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Téléphone</label>
        <input type="text" value={siteData.telephone} onChange={(e) => handleChange('telephone', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Adresse</label>
        <textarea value={siteData.adresse} onChange={(e) => handleChange('adresse', e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', height:'60px' }} />
      </div>

      <button 
        onClick={handleSave}
        disabled={saving}
        style={{
          width: '100%', padding: '1rem', background: '#007bff', color: 'white', border: 'none',
          borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem'
        }}
      >
        {saving ? '⏳ Enregistrement...' : '💾 Sauvegarder sur Supabase'}
      </button>

      <div style={{marginTop:'1.5rem', fontSize:'0.8rem', opacity:0.6}}>
        ID Supabase détecté : {siteData.id}
      </div>
    </div>
  );
}
