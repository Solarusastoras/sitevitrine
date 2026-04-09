import React from 'react';
import ThemeRenderer from '../components/ThemeRenderer';

const Home = ({ onProductClick, products, storeInfo }) => {
  return <ThemeRenderer onProductClick={onProductClick} products={products} storeInfo={storeInfo} />;
};

export default Home;
