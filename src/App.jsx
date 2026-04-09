import React, { useEffect, useState } from 'react'
import { PROFESSIONS } from './professions'
import { THEME_MATRIX } from './themes'
import { supabase } from './supabaseClient'
import ThemeLuxe from './themes/ThemeLuxe'
import ThemeVintage from './themes/ThemeVintage'
import ThemeMinimal from './themes/ThemeMinimal'
import ThemeUrbain from './themes/ThemeUrbain'
import ThemeEco from './themes/ThemeEco'

// Gastronomy Themes
import ThemeRestoPremium from './themes/restaurant/ThemeRestoPremium'
import ThemeRestoClassique from './themes/restaurant/ThemeRestoClassique'
import ThemeRestoModerne from './themes/restaurant/ThemeRestoModerne'
import ThemeRestoRustique from './themes/restaurant/ThemeRestoRustique'
import ThemeRestoBistro from './themes/restaurant/ThemeRestoBistro'

import './themes.css'
import Configurator from './Configurator.jsx'
import { getPlaceholderProducts } from './productsData'

function App() {
  const [currentStyle, setCurrentStyle] = useState(1);
  const [currentMetier, setCurrentMetier] = useState('Boulangerie');
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);
  const [products, setProducts] = useState([]);

  // Find category for current profession (Dynamic Theme)
  const professionData = PROFESSIONS.find(p => currentMetier.toLowerCase().includes(p.name.toLowerCase())) || { category: "SERVICES" };
  const category = professionData.category;
  const isRestaurant = ["restaurant", "bistro", "café", "brasserie", "auberge"].some(word => currentMetier.toLowerCase().includes(word));

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

  // Fetch products from Supabase or generate placeholders
  useEffect(() => {
    async function fetchProducts() {
      if (!selectedEnterprise) return;
      
      const { data, error } = await supabase
        .from('produits')
        .select('*')
        .eq('entreprise_id', selectedEnterprise.id);

      if (data && data.length > 0) {
        setProducts(data);
      } else {
        // Fallback to high-quality placeholders for demo
        setProducts(getPlaceholderProducts(category, currentMetier));
      }
    }
    fetchProducts();
  }, [selectedEnterprise, category, currentMetier]);

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
      <div style={{ padding: '20vh 0', textAlign: 'center', opacity: 0.4 }}>
         <h2>Aucun commerce trouvé pour ce métier dans Supabase.</h2>
         <p>Essayez "Boulangerie" ou "Boucherie" pour la démonstration.</p>
      </div>
    );

    // RESTAURANT FAMILY
    if (isRestaurant) {
      switch(currentStyle) {
        case 1: return <ThemeRestoPremium siteData={siteData} products={products} />;
        case 2: return <ThemeRestoClassique siteData={siteData} products={products} />;
        case 3: return <ThemeRestoModerne siteData={siteData} products={products} />;
        case 4: return <ThemeRestoRustique siteData={siteData} products={products} />;
        case 5: return <ThemeRestoBistro siteData={siteData} products={products} />;
        default: return <ThemeRestoPremium siteData={siteData} products={products} />;
      }
    }

    // BUSINESS FAMILY
    switch(currentStyle) {
      case 1: return <ThemeLuxe siteData={siteData} products={products} />;
      case 2: return <ThemeVintage siteData={siteData} products={products} />;
      case 3: return <ThemeMinimal siteData={siteData} products={products} />;
      case 4: return <ThemeUrbain siteData={siteData} products={products} />;
      case 5: return <ThemeEco siteData={siteData} products={products} />;
      default: return <ThemeMinimal siteData={siteData} products={products} />;
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
      />

      {/* 💎 RENDU DU THÈME PREMIUM SÉLECTIONNÉ */}
      <main style={{ marginTop: '80px' }}>
        {renderTheme()}
      </main>
    </div>
  )
}

export default App
