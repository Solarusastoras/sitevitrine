import React from 'react';
import ThemeRenderer from '../components/ThemeRenderer';

const CategoryPage = ({ onProductClick, products, storeInfo }) => {
  return <ThemeRenderer onProductClick={onProductClick} products={products} storeInfo={storeInfo} />;
};

export default CategoryPage;
