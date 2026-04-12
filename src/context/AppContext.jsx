import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { PROFESSIONS } from '../professions';
import { getPlaceholderProducts } from '../productsData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentStyle, setCurrentStyle] = useState(1);
  const [currentMetier, setCurrentMetier] = useState('Boulangerie');
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);
  const [products, setProducts] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [isClientConnected, setIsClientConnected] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [entreprises, setEntreprises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('site_favoris');
    return saved ? JSON.parse(saved) : [];
  });
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const isFav = prev.includes(productId);
      const next = isFav ? prev.filter(id => id !== productId) : [...prev, productId];
      localStorage.setItem('site_favoris', JSON.stringify(next));
      return next;
    });
  };

  const professionData = PROFESSIONS.find(p => currentMetier.toLowerCase().includes(p.name.toLowerCase())) || { category: "SERVICES" };
  const category = professionData.category;
  const isRestaurant = ["restaurant", "bistro", "café", "brasserie", "auberge"].some(word => currentMetier.toLowerCase().includes(word));

  const fetchProducts = async () => {
    if (!selectedEnterprise) return;
    const { data } = await supabase
      .from('produits')
      .select('*')
      .eq('entreprise_id', selectedEnterprise.id);

    if (data && data.length > 0) {
      setProducts(data);
    } else {
      setProducts(getPlaceholderProducts(category, currentMetier));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedEnterprise, category, currentMetier, refreshTrigger]);

  // Fetch enterprises whenever the profession (metier) changes
  useEffect(() => {
    async function fetchEntreprises() {
      if (!currentMetier) return;
      setLoading(true);
      const { data } = await supabase
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

  const siteData = selectedEnterprise ? {
    ...selectedEnterprise,
    selectedStyle: currentStyle,
    nomEntreprise: selectedEnterprise.nom,
    metier: selectedEnterprise.secteur,
    category: category,
    descriptionCourte: selectedEnterprise.description_courte || 
                       (selectedEnterprise.secteur === 'Boulangerie' ? "L'excellence artisanale au service de votre gourmandise." : "Votre professionnel de confiance."),
    descriptionLongue: selectedEnterprise.description || "Bienvenue sur notre site vitrine premium.",
    horaires: typeof selectedEnterprise.horaires === 'string' ? JSON.parse(selectedEnterprise.horaires) : selectedEnterprise.horaires || {},
    mapsIframeUrl: `https://maps.google.com/maps?q=${selectedEnterprise.adresse}&z=15&output=embed`,
    telephone: selectedEnterprise.telephone,
    email: selectedEnterprise.email,
    adresse: selectedEnterprise.adresse
  } : null;

  const value = {
    currentStyle, setCurrentStyle,
    currentMetier, setCurrentMetier,
    selectedEnterprise, setSelectedEnterprise,
    products, setProducts,
    refreshTrigger, setRefreshTrigger,
    isAdminConnected, setIsAdminConnected,
    isClientConnected, setIsClientConnected,
    editingProduct, setEditingProduct,
    entreprises, loading,
    favorites, toggleFavorite,
    isFavoritesModalOpen, setIsFavoritesModalOpen,
    category, isRestaurant, professionData, siteData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
