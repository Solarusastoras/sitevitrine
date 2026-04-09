import React, { useState } from 'react';
import { supabase } from '../supabase';
import './AddDishForm.scss';

const AddDishForm = ({ onAddDish }) => {
  const [dish, setDish] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Plats'
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('dish-images')
      .upload(filePath, imageFile);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('dish-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dish.name || !dish.price) return;
    
    setUploading(true);
    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImage();
      }
      
      onAddDish({ ...dish, image: imageUrl });
      setDish({ name: '', description: '', price: '', category: 'Plats' });
      setImageFile(null);
    } catch (error) {
      console.error('Error adding dish:', error);
      alert('Erreur lors de l\'ajout du plat ou de l\'image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="add-section" id="add">
      <div className="container">
        <div className="form-card">
          <div className="form-header">
            <h2>Ajouter un Plat</h2>
            <p>Enrichissez la carte de votre restaurant</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nom du plat</label>
              <input 
                type="text" 
                value={dish.name}
                onChange={(e) => setDish({...dish, name: e.target.value})}
                placeholder="Ex: Risotto aux truffes..."
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Prix (€)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={dish.price}
                  onChange={(e) => setDish({...dish, price: e.target.value})}
                  placeholder="15.50"
                  required
                />
              </div>
              <div className="form-group">
                <label>Catégorie</label>
                <select 
                  value={dish.category}
                  onChange={(e) => setDish({...dish, category: e.target.value})}
                >
                  <option>Entrée</option>
                  <option>Plats</option>
                  <option>Dessert</option>
                  <option>Boisson</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                rows="4"
                value={dish.description}
                onChange={(e) => setDish({...dish, description: e.target.value})}
                placeholder="Décrivez les ingrédients et les saveurs..."
              ></textarea>
            </div>
            <div className="form-group">
              <label>Photo du plat</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
            </div>
            <button type="submit" className="submit-btn" disabled={uploading}>
              {uploading ? 'Chargement...' : 'Ajouter à la Carte'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddDishForm;
