import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { supabase } from '../../supabaseClient';
import { useApp } from '../../context/AppContext';
import { X, Upload } from 'lucide-react';

export default function ProductAddModal({ isOpen, onClose, availableCategories }) {
  const { selectedEnterprise, setRefreshTrigger, isRestaurant } = useApp();
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nom: '', prix: '', tag: '', desc: '', category: availableCategories[0], file: null, preview: null
  });

  const handleAddProduct = async () => {
    if (!newProduct.nom || !selectedEnterprise) return;
    setLoading(true);

    try {
      let finalImageUrl = "";

      if (newProduct.file) {
        const fileName = `${selectedEnterprise.id}/new_${Date.now()}.${newProduct.file.name.split('.').pop()}`;
        await supabase.storage.from('img').upload(fileName, newProduct.file);
        const { data: { publicUrl } } = supabase.storage.from('img').getPublicUrl(fileName);
        finalImageUrl = publicUrl;
      }

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

      setRefreshTrigger(prev => prev + 1);
      onClose();
    } catch (err) {
      alert("Erreur ajout : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 100000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      position: 'relative',
      inset: 'auto',
      width: '95%',
      maxWidth: '600px',
      maxHeight: '95vh',
      padding: '40px',
      borderRadius: '40px',
      border: 'none',
      background: '#fff',
      overflowY: 'auto',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="modal-overlay"
      className="modal-content"
      contentLabel="Ajouter un article"
    >
      <button onClick={onClose} className="btn-close-circle">
        <X size={20} />
      </button>

      <h2>Nouvel Article</h2>
      
      <div className="form-grid">
        <div className="img-upload-box">
          {newProduct.preview ? (
            <img src={newProduct.preview} alt="Preview" />
          ) : (
            <div className="placeholder">
              <Upload size={40} />
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
          <input 
            placeholder="Ex: Croissant au Beurre" 
            value={newProduct.nom} 
            onChange={(e) => setNewProduct({ ...newProduct, nom: e.target.value })} 
          />
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Prix (€)</label>
            <input 
              placeholder="0.00" 
              type="number" 
              value={newProduct.prix} 
              onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })} 
            />
          </div>
          <div className="input-group">
            <label>Catégorie</label>
            <select 
              value={newProduct.category} 
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            >
              {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Tag (Badge)</label>
          <input 
            placeholder="Ex: -50%" 
            className="input-tag"
            value={newProduct.tag} 
            onChange={(e) => setNewProduct({ ...newProduct, tag: e.target.value })} 
          />
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            placeholder="Plus de détails sur l'article..."
            value={newProduct.desc}
            onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
          />
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">ANNULER</button>
          <button onClick={handleAddProduct} className="btn-save">
            {loading ? 'ENREGISTREMENT...' : 'ENREGISTRER'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
