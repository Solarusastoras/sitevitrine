import React, { useState, useRef, useEffect } from 'react';
import './AddProductModal.scss';
import { X, Check, Globe, FileImage, Camera, Trash2, Search, Store, ShoppingBag, MapPin, Phone, Mail, Clock, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

const GENDERS = ['homme', 'femme', 'enfant'];
const TAGS = [
  { value: 'none', label: 'Aucun' },
  { value: 'nouveau', label: 'Nouveau' },
  { value: 'promo', label: 'Promo' }
];

const AddProductModal = ({ isOpen, onClose, onAdd, storeInfo, onUpdateStore }) => {
  const [activeTab, setActiveTab] = useState('product'); // 'product', 'store'
  
  // Product Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    gender: 'femme',
    subCategory: 'haut',
    tag: 'nouveau'
  });
  const [sourceType, setSourceType] = useState('url');
  
  // Store Form State
  const [storeFormData, setStoreFormData] = useState(storeInfo);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setStoreFormData(storeInfo);
    }
  }, [isOpen, storeInfo]);

  if (!isOpen) return null;

  // Product Logic
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setFormData({ ...formData, image: dataUrl });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const resetProductForm = () => {
    setFormData({
        name: '',
        price: '',
        image: '',
        gender: 'femme',
        subCategory: 'haut',
        tag: 'nouveau'
      });
      setSourceType('url');
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    onAdd({ ...formData, isNew: formData.tag === 'nouveau' });
    resetProductForm();
    onClose();
  };

  // Store Logic
  const handleStoreSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchResults([]);
    try {
      const supabaseUrl = 'https://pcuiellfuoeaeddyzhlz.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdWllbGxmdW9lYWVkZHl6aGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NzYwOTYsImV4cCI6MjA4OTE1MjA5Nn0.X0C0VzZZZInZqVExEzVOBKVJU86VSaSlpnBMHW4vgc8';
      
      const res = await fetch(`${supabaseUrl}/rest/v1/entreprises?nom=ilike.*${searchQuery}*&select=*`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      });
      
      // Since I don't have the real key, I'll use a fallback text search or mention it to the user.
      // But typically these public Supabase URLs are accessible if CORS is open.
      // Let's try to fetch normally if possible.
      
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error("Search failed", err);
      // Fallback: If fetch fails due to auth/CORS, we'll inform the user.
      alert("La recherche API nécessite une clé ou une configuration CORS. Pour l'instant, veuillez copier les infos manuellement.");
    } finally {
      setIsSearching(false);
    }
  };

  const importStore = (item) => {
    // Map Supabase fields to our structure
    const newHours = [
      { day: "Lundi", time: item.horaires?.lundi || "Fermé" },
      { day: "Mardi", time: item.horaires?.mardi || "Fermé" },
      { day: "Mercredi", time: item.horaires?.mercredi || "Fermé" },
      { day: "Jeudi", time: item.horaires?.jeudi || "Fermé" },
      { day: "Vendredi", time: item.horaires?.vendredi || "Fermé" },
      { day: "Samedi", time: item.horaires?.samedi || "Fermé" },
      { day: "Dimanche", time: item.horaires?.dimanche || "Fermé" }
    ];

    setStoreFormData({
      ...storeFormData,
      name: item.nom,
      address: item.adresse,
      phone: item.telephone || '',
      email: item.email || '',
      coordinates: item.coordonnees || { lat: 48.8566, lng: 2.3522 },
      hours: newHours
    });
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleStoreSubmit = (e) => {
    e.preventDefault();
    onUpdateStore(storeFormData);
    onClose();
  };

  const updateHour = (index, value) => {
    const newHours = [...storeFormData.hours];
    newHours[index].time = value;
    setStoreFormData({ ...storeFormData, hours: newHours });
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-content">
        <button className="admin-modal-close" onClick={onClose}><X size={20} /></button>
        
        <header className="admin-modal-header">
          <div className="admin-tabs">
            <button className={activeTab === 'product' ? 'active' : ''} onClick={() => setActiveTab('product')}>
               <ShoppingBag size={18} /> Produit
            </button>
            <button className={activeTab === 'store' ? 'active' : ''} onClick={() => setActiveTab('store')}>
               <Store size={18} /> Boutique
            </button>
          </div>
          <h2>{activeTab === 'product' ? 'Nouvel Article' : 'Paramètres Boutique'}</h2>
          <p>{activeTab === 'product' ? 'Ajoutez un vêtement à votre catalogue.' : 'Gérez l\'adresse, les horaires et le plan.'}</p>
        </header>

        {activeTab === 'product' ? (
          <form onSubmit={handleProductSubmit} className="admin-modal-form">
            <div className="form-group">
                <label>Nom de l'article *</label>
                <input 
                type="text" 
                placeholder="Ex: Veste en Cuir" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                />
            </div>

            <div className="form-row">
                <div className="form-group flex-1">
                <label>Prix (€) *</label>
                <input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                />
                </div>
                <div className="form-group flex-1">
                <label>Tag</label>
                <select 
                    value={formData.tag}
                    onChange={(e) => setFormData({...formData, tag: e.target.value})}
                >
                    {TAGS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                </div>
            </div>

            <div className="image-source-section">
                <label>Image de l'article *</label>
                <div className="source-tabs">
                <button type="button" className={sourceType === 'url' ? 'active' : ''} onClick={() => setSourceType('url')}><Globe size={16} /> URL</button>
                <button type="button" className={sourceType === 'upload' ? 'active' : ''} onClick={() => setSourceType('upload')}><FileImage size={16} /> Fichier</button>
                <button type="button" className={sourceType === 'camera' ? 'active' : ''} onClick={() => setSourceType('camera')}><Camera size={16} /> Caméra</button>
                </div>

                <div className="source-input-container">
                {sourceType === 'url' && (
                    <input 
                    type="text" 
                    placeholder="Lien vers l'image" 
                    value={formData.image.startsWith('data:') ? '' : formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                )}
                {sourceType === 'upload' && (
                    <div className="file-upload-box" onClick={() => fileInputRef.current.click()}>
                    <FileImage size={24} />
                    <span>Choisir un fichier</span>
                    <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileChange} />
                    </div>
                )}
                {sourceType === 'camera' && (
                    <div className="file-upload-box" onClick={() => cameraInputRef.current.click()}>
                    <Camera size={24} />
                    <span>Prendre une photo</span>
                    <input type="file" accept="image/*" capture="environment" hidden ref={cameraInputRef} onChange={handleFileChange} />
                    </div>
                )}
                </div>

                {formData.image && (
                <div className="image-preview-wrapper">
                    <img src={formData.image} alt="Preview" className="image-preview" />
                    <button type="button" className="remove-image" onClick={() => setFormData({...formData, image: ''})}><Trash2 size={14} /></button>
                </div>
                )}
            </div>

            <div className="form-row">
                <div className="form-group flex-1">
                <label>Genre</label>
                <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                    {GENDERS.map(g => <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
                </select>
                </div>
                <div className="form-group flex-1">
                <label>Catégorie</label>
                <select value={formData.subCategory} onChange={(e) => setFormData({...formData, subCategory: e.target.value})}>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                </div>
            </div>

            <button type="submit" className="admin-submit-btn">
                <Check size={18} /> Ajouter à la Collection
            </button>
          </form>
        ) : (
          <div className="store-settings-form">
            <div className="import-section">
              <label>Importer depuis votre site entreprise</label>
              <div className="search-bar">
                <input 
                  type="text" 
                  placeholder="Chercher une boutique (ex: Podologue, Restaurant...)" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleStoreSearch()}
                />
                <button onClick={handleStoreSearch} disabled={isSearching}>
                  {isSearching ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                </button>
              </div>
              
              {searchResults.length > 0 && (
                <ul className="search-results-list">
                  {searchResults.map(item => (
                    <li key={item.id} onClick={() => importStore(item)}>
                      <strong>{item.nom}</strong>
                      <span>{item.adresse}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <form onSubmit={handleStoreSubmit} className="admin-modal-form">
               <div className="form-group">
                  <label><MapPin size={14} /> Adresse Complète</label>
                  <input 
                    type="text" 
                    value={storeFormData.address}
                    onChange={(e) => setStoreFormData({...storeFormData, address: e.target.value})}
                  />
               </div>

               <div className="form-row">
                  <div className="form-group flex-1">
                    <label><Phone size={14} /> Téléphone</label>
                    <input 
                      type="text" 
                      value={storeFormData.phone}
                      onChange={(e) => setStoreFormData({...storeFormData, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label><Mail size={14} /> Email</label>
                    <input 
                      type="email" 
                      value={storeFormData.email}
                      onChange={(e) => setStoreFormData({...storeFormData, email: e.target.value})}
                    />
                  </div>
               </div>

               <div className="form-group">
                  <label><Clock size={14} /> Horaires d'ouverture</label>
                  <div className="hours-edit-grid">
                    {storeFormData.hours.map((h, index) => (
                      <div key={index} className="hour-edit-row">
                        <span>{h.day}</span>
                        <input 
                          type="text" 
                          value={h.time}
                          onChange={(e) => updateHour(index, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
               </div>

               <button type="submit" className="admin-submit-btn store-save-btn">
                  <Check size={18} /> Enregistrer les Paramètres
               </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductModal;
