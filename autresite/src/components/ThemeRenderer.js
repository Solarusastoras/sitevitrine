import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Import Themes
import Minimaliste from '../themes/Minimaliste/Minimaliste';
import Luxe from '../themes/Luxe/Luxe';
import Urbain from '../themes/Urbain/Urbain';
import Eco from '../themes/Eco/Eco';
import Vintage from '../themes/Vintage/Vintage';

const ThemeRenderer = ({ onProductClick, products, storeInfo }) => {
  const { theme } = useTheme();

  switch (theme) {
    case 'minimaliste':
      return <Minimaliste onProductClick={onProductClick} products={products} storeInfo={storeInfo} />;
    case 'luxe':
      return <Luxe onProductClick={onProductClick} products={products} storeInfo={storeInfo} />;
    case 'urbain':
      return <Urbain onProductClick={onProductClick} products={products} storeInfo={storeInfo} />;
    case 'eco':
      return <Eco onProductClick={onProductClick} products={products} storeInfo={storeInfo} />;
    case 'vintage':
      return <Vintage onProductClick={onProductClick} products={products} storeInfo={storeInfo} />;
    default:
      return <Minimaliste onProductClick={onProductClick} products={products} storeInfo={storeInfo} />;
  }
};

export default ThemeRenderer;
