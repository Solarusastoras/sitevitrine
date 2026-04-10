import React, { useEffect, useState } from 'react'
import { PROFESSIONS } from './professions'
import { THEME_MATRIX } from './themes'
import { supabase } from './supabaseClient'
import ThemeLuxe from './themes/ThemeLuxe'
import ThemeVintage from './themes/ThemeVintage'
import ThemeMinimal from './themes/ThemeMinimal'
import ThemeModerne from './themes/ThemeModerne'
import ThemeEco from './themes/ThemeEco'

// Gastronomy Themes
import ThemeRestoPremium from './themes/restaurant/ThemeRestoPremium'
import ThemeRestoClassique from './themes/restaurant/ThemeRestoClassique'
import ThemeRestoModerne from './themes/restaurant/ThemeRestoModerne'
import ThemeRestoRustique from './themes/restaurant/ThemeRestoRustique'
import ThemeRestoBistro from './themes/restaurant/ThemeRestoBistro'

import Configurator from './Configurator.jsx'
import { getPlaceholderProducts } from './productsData'

function App() {
  const [currentStyle, setCurrentStyle] = useState(1);
  const [currentMetier, setCurrentMetier] = useState('Boulangerie');
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);
  const [products, setProducts] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Auth & In-Situ Editing States
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [isClientConnected, setIsClientConnected] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Find category for current profession (Dynamic Theme)
  const professionData = PROFESSIONS.find(p => currentMetier.toLowerCase().includes(p.name.toLowerCase())) || { category: "SERVICES" };
  const category = professionData.category;
  const isRestaurant = ["restaurant", "bistro", "café", "brasserie", "auberge"].some(word => currentMetier.toLowerCase().includes(word));

  // Fetch products from Supabase or generate placeholders
  const fetchProducts = async () => {
    if (!selectedEnterprise) return;
    
    const { data, error } = await supabase
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

  // Derive siteData from selectedEnterprise
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

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  useEffect(() => {
    // Apply theme variables to root
    const theme = THEME_MATRIX[category][currentStyle];
    if (!theme) return;
    
    // Map style 1-5 to 6-10 for restaurants in CSS data-theme
    const styleId = isRestaurant ? currentStyle + 5 : currentStyle;
    
    const root = document.documentElement;
    document.body.setAttribute('data-theme', styleId);
    
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    document.body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  }, [currentStyle, category]);

  // Helper to render the correct Premium Theme Component
  const renderTheme = () => {
    if (!siteData) return (
      <div className="no-commerce-found">
         <h2>Aucun commerce trouvé pour ce métier dans Supabase.</h2>
         <p>Essayez "Boulangerie" ou "Boucherie" pour la démonstration.</p>
      </div>
    );

    const themeProps = { 
      siteData, 
      products, 
      isEditable: isClientConnected, 
      onEditProduct: setEditingProduct 
    };

    // RESTAURANT FAMILY
    if (isRestaurant) {
      switch(currentStyle) {
        case 1: return <ThemeRestoPremium {...themeProps} />;
        case 2: return <ThemeRestoClassique {...themeProps} />;
        case 3: return <ThemeRestoModerne {...themeProps} />;
        case 4: return <ThemeRestoRustique {...themeProps} />;
        case 5: return <ThemeRestoBistro {...themeProps} />;
        default: return <ThemeRestoPremium {...themeProps} />;
      }
    }

    // BUSINESS FAMILY
    switch(currentStyle) {
      case 1: return <ThemeLuxe {...themeProps} />;
      case 2: return <ThemeVintage {...themeProps} />;
      case 3: return <ThemeMinimal {...themeProps} />;
      case 4: return <ThemeModerne {...themeProps} />;
      case 5: return <ThemeEco {...themeProps} />;
      default: return <ThemeMinimal {...themeProps} />;
    }
  }

  return (
    <div className="app-container">
      {/* 🛠️ CONFIGURATEUR UNIVERSEL */}
      <Configurator 
        currentStyle={currentStyle} setCurrentStyle={setCurrentStyle}
        currentMetier={currentMetier} setCurrentMetier={setCurrentMetier}
        selectedEnterprise={selectedEnterprise} setSelectedEnterprise={setSelectedEnterprise}
        category={category}
        products={products}
        onUpdate={() => setRefreshTrigger(prev => prev + 1)}
        isAdminConnected={isAdminConnected} setIsAdminConnected={setIsAdminConnected}
        isClientConnected={isClientConnected} setIsClientConnected={setIsClientConnected}
        editingProduct={editingProduct} setEditingProduct={setEditingProduct}
      />

      {/* 💎 RENDU DU THÈME PREMIUM SÉLECTIONNÉ */}
      <main style={{ marginTop: '120px' }}>
        {renderTheme()}
      </main>
    </div>
  );
}

export default App;
