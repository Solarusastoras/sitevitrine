import React, { useState } from 'react';
import Modal from 'react-modal';
import { supabase } from '../../supabaseClient';
import { useApp } from '../../context/AppContext';
import { X, Camera, Check } from 'lucide-react';

export default function QuickEditModal({ availableCategories }) {
  const { editingProduct, setEditingProduct, selectedEnterprise, setRefreshTrigger } = useApp();
  const [uploadingId, setUploadingId] = useState(null);

  const handleProductUpdate = async (productId, field, value) => {
    try {
      const { error } = await supabase
        .from('produits')
        .update({ [field]: value })
        .eq('id', productId);
      if (error) throw error;
      setRefreshTrigger(prev => prev + 1);
    } catch (err) { console.error(err); }
  };

  const handlePhotoUpload = async (productId, file) => {
    if (!file) return;
    setUploadingId(productId);
    try {
      const fileName = `${selectedEnterprise.id}/${productId}_${Date.now()}.${file.name.split('.').pop()}`;
      await supabase.storage.from('img').upload(fileName, file, { upsert: true });
      const { data: { publicUrl } } = supabase.storage.from('img').getPublicUrl(fileName);
      await supabase.from('produits').update({ image_url: publicUrl }).eq('id', productId);
      setRefreshTrigger(prev => prev + 1);
    } catch (err) { alert(err.message); }
    finally { setUploadingId(null); }
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

  if (!editingProduct) return null;

  return (
    <Modal
      isOpen={!!editingProduct}
      onRequestClose={() => setEditingProduct(null)}
      overlayClassName="modal-overlay"
      className="modal-content"
      contentLabel="Modification Rapide"
    >
      <button onClick={() => setEditingProduct(null)} className="btn-close-circle">
        <X size={20} />
      </button>

      <h2>Modifier l'article</h2>
      
      <div className="form-grid">
        <div className="img-upload-box">
          <img src={editingProduct.image_url || editingProduct.img} alt="Preview" />
          <input 
            type="file" accept="image/*" 
            onChange={(e) => handlePhotoUpload(editingProduct.id, e.target.files[0])} 
          />
          {uploadingId === editingProduct.id && (
            <div className="loader-overlay">
              CHARGEMENT...
            </div>
          )}
        </div>

        <div className="input-group">
          <label>Nom</label>
          <input 
            defaultValue={editingProduct.nom || editingProduct.name} 
            onBlur={(e) => handleProductUpdate(editingProduct.id, 'nom', e.target.value)} 
          />
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Prix (€)</label>
            <input 
              type="number" 
              defaultValue={editingProduct.prix} 
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

        <div className="modal-actions">
          <button onClick={() => setEditingProduct(null)} className="btn-full" style={{ background: '#000' }}>
            <Check size={20} />
            TERMINER
          </button>
        </div>
      </div>
    </Modal>
  );
}
