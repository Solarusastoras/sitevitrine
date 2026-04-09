import React, { useState, useEffect } from 'react';
import { PROFESSIONS } from './professions';
import { supabase } from './supabaseClient';

export default function Configurator({ 
  currentStyle, setCurrentStyle, 
  currentMetier, setCurrentMetier, 
  selectedEnterprise, setSelectedEnterprise,
  category // New prop
}) {
  const [entreprises, setEntreprises] = useState([]);
  const [loading, setLoading] = useState(false);

  const isRestaurant = ["restaurant", "bistro", "café", "brasserie", "auberge"].some(word => currentMetier.toLowerCase().includes(word));

  const styleNames = isRestaurant 
    ? ["Premium", "Classique", "Moderne", "Rustique", "Bistro"]
    : ["Luxe", "Vintage", "Minimal", "Urbain", "Eco"];

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
        // Automatically select the first enterprise if available
        if (data.length > 0) setSelectedEnterprise(data[0]);
        else setSelectedEnterprise(null);
      }
      setLoading(false);
    }
    fetchEntreprises();
  }, [currentMetier]);

  return (
    <div style={{
      position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
      width: '95%', maxWidth: '1100px', zIndex: 10000,
      background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(15px)',
      padding: '0.8rem 1.5rem', borderRadius: '100px', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.5)'
    }}>
      {/* 1. METIER SELECTOR */}
      <div style={{ flex: 1.2 }}>
        <label style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', opacity: 0.5, display: 'block', marginBottom: '5px' }}>1. Métier</label>
        <select 
          value={currentMetier}
          onChange={(e) => setCurrentMetier(e.target.value)}
          style={{ width: '100%', border: 'none', background: 'transparent', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', outline: 'none' }}
        >
          {PROFESSIONS.sort((a,b) => a.name.localeCompare(b.name)).map(p => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* 2. STYLE SELECTOR */}
      <div style={{ flex: 2.5, borderLeft: '1px solid #ddd', paddingLeft: '1.5rem' }}>
        <label style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', opacity: 0.5, display: 'block', marginBottom: '8px' }}>2. Univers Visuel ({category === 'FOOD' ? 'Gastronomie' : 'Business'})</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1,2,3,4,5].map((s, i) => (
            <button key={s} onClick={() => setCurrentStyle(s)} style={{
                padding: '8px 15px', borderRadius: '50px', border: 'none',
                background: currentStyle === s ? '#000' : '#eee',
                color: currentStyle === s ? '#fff' : '#000',
                cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '85px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <span style={{ opacity: 0.5, fontSize: '0.6rem' }}>STYLE {s}</span>
                <span style={{ textTransform: 'uppercase' }}>{styleNames[i]}</span>
              </button>
          ))}
        </div>
      </div>

      {/* 3. ENTERPRISE SELECTOR */}
      <div style={{ flex: 2, borderLeft: '1px solid #ddd', paddingLeft: '2rem' }}>
        <label style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', opacity: 0.5, display: 'block', marginBottom: '5px' }}>
          3. Entreprise ({loading ? '...' : entreprises.length})
        </label>
        <select 
          value={selectedEnterprise?.id || ''}
          onChange={(e) => setSelectedEnterprise(entreprises.find(ent => ent.id === Number(e.target.value)))}
          style={{ width: '100%', border: 'none', background: 'transparent', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', outline: 'none', color: '#007bff' }}
          disabled={entreprises.length === 0}
        >
          {entreprises.length === 0 ? (
            <option>Aucune donnée Supabase</option>
          ) : (
            entreprises.map(e => (
              <option key={e.id} value={e.id}>{e.nom}</option>
            ))
          )}
        </select>
      </div>

      <div style={{ background: '#000', color: '#fff', padding: '10px 15px', borderRadius: '50px', fontSize: '1.2rem' }}>
        ✨
      </div>
    </div>
  );
}
