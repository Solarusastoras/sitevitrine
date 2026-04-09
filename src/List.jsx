import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';

import { PROFESSIONS } from './professions';

export default function List() {
  const { name, catId } = useParams();
  const [entreprises, setEntreprises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchList() {
      setLoading(true);
      let query = supabase.from('entreprises').select('*');

      if (catId) {
        // Find all profession names in this category
        const profsInCat = PROFESSIONS.filter(p => p.category === catId).map(p => p.name);
        query = query.in('secteur', profsInCat);
      } else if (name) {
        query = query.ilike('secteur', `%${name}%`);
      }

      const { data, error } = await query;
      
      if (data) setEntreprises(data);
      setLoading(false);
    }
    fetchList();
  }, [name, catId]);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
      🔍 Recherche de professionnels : {name}...
    </div>
  );

  return (
    <div className="list-container" style={{ background: '#f8f9fa', minHeight: '100vh', padding: '5rem 0' }}>
      <div className="container">
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>← Retour à la recherche</Link>
        <h1 style={{ fontSize: '3rem', margin: '2rem 0', color: '#1a2a6c' }}>Résultats pour "{name}"</h1>
        
        {entreprises.length === 0 ? (
          <div style={{ background: 'white', padding: '4rem', borderRadius: '20px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '1.5rem', opacity: 0.5 }}>Aucune entreprise trouvée dans ce secteur pour le moment. 😕</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {entreprises.map(e => (
              <div key={e.id} className="reveal" style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', transition: 'transform 0.3s', cursor: 'pointer' }}>
                <div style={{ height: '180px', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', padding:'2rem', textAlign:'center' }}>
                    {e.nom}
                </div>
                <div style={{ padding: '2rem' }}>
                  <p style={{ color: '#007bff', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{e.secteur}</p>
                  <p style={{ fontSize: '1rem', opacity: 0.7, marginBottom: '1.5rem', height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.description}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    <p>📍 {e.adresse}</p>
                    <p>📞 {e.telephone}</p>
                  </div>
                  <Link 
                    to={`/site/${e.id}`} 
                    style={{ display: 'block', padding: '1rem', background: '#1a2a6c', color: 'white', textDecoration: 'none', textAlign: 'center', borderRadius: '10px', fontWeight: 'bold' }}
                  >
                    Voir la Vitrine Premium →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
