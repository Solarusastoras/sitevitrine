import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Routes, Route } from 'react-router-dom';
import ThemeSwitcher from './components/ThemeSwitcher';
import ScrollToTop from './components/ScrollToTop';
import Lightbox from './components/Lightbox';
import AdminButton from './components/AdminButton';
import AddProductModal from './components/AddProductModal';

// Import Pages
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';

import { PRODUCTS as INITIAL_PRODUCTS, STORE_INFO as INITIAL_STORE_INFO } from './data/mockData';
import './App.scss';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('vetement_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  
  const [storeInfo, setStoreInfo] = useState(() => {
    const saved = localStorage.getItem('vetement_store_info');
    return saved ? JSON.parse(saved) : INITIAL_STORE_INFO;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('vetement_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('vetement_store_info', JSON.stringify(storeInfo));
  }, [storeInfo]);

  const handleProductClick = (product) => {
    setSelectedImage(product.image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: `p${Date.now()}`,
      price: parseFloat(newProduct.price)
    };
    setProducts(prev => [productWithId, ...prev]);
  };

  const updateStoreInfo = (newInfo) => {
    setStoreInfo(newInfo);
  };

  return (
    <ThemeProvider>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home onProductClick={handleProductClick} products={products} storeInfo={storeInfo} />} />
          <Route path="/:gender" element={<CategoryPage onProductClick={handleProductClick} products={products} storeInfo={storeInfo} />} />
          <Route path="/:gender/:subCategory" element={<CategoryPage onProductClick={handleProductClick} products={products} storeInfo={storeInfo} />} />
        </Routes>
        
        <AdminButton onClick={() => setIsAdminOpen(true)} />
        <AddProductModal 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
          onAdd={addProduct}
          storeInfo={storeInfo}
          onUpdateStore={updateStoreInfo}
        />

        <ThemeSwitcher />
        <Lightbox imageUrl={selectedImage} onClose={closeLightbox} />
      </div>
    </ThemeProvider>
  );
}

export default App;
