import React, { useState } from 'react';
import { PROFESSIONS } from '../../professions';
import { useApp } from '../../context/AppContext';
import Header from './Header';
import AdminPanel from '../management/AdminPanel';
import ProductAddModal from '../management/ProductAddModal';
import CatalogueModal from '../management/CatalogueModal';
import QuickEditModal from '../management/QuickEditModal';

export default function Configurator() {
  const {
    currentMetier,
    selectedEnterprise,
    isClientConnected
  } = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const professionInfo = PROFESSIONS.find(p => p.name === currentMetier);
  const availableCategories = professionInfo?.productCategories || ["Article", "Service"];

  return (
    <div className="configurator-wrapper">
      <Header 
        onShowAdmin={() => setShowAdmin(!showAdmin)}
        onAdd={() => setIsAdding(true)}
        onManage={() => setIsEditing(true)}
        isAdding={isAdding}
        isEditing={isEditing}
      />

      {/* 🚀 BARRE DE GESTION BOUTIQUE */}
      {isClientConnected && (
        <div className="admin-bar">
          <button onClick={() => setIsAdding(true)} className="btn-add">➕ AJOUTER</button>
          <button onClick={() => setIsEditing(true)} className="btn-manage">📦 GÉRER</button>
        </div>
      )}

      {/* 🔐 PANNEAU ACCÈS / LOGIN */}
      <AdminPanel 
        isOpen={showAdmin} 
        onClose={() => setShowAdmin(false)} 
      />

      {/* ➕ MODAL AJOUT ARTICLE */}
      <ProductAddModal 
        isOpen={isAdding}
        onClose={() => setIsAdding(false)} 
        availableCategories={availableCategories} 
      />

      {/* 📦 MODAL GESTION CATALOGUE */}
      <CatalogueModal 
        isOpen={isEditing}
        onClose={() => setIsEditing(false)} 
        availableCategories={availableCategories} 
      />

      {/* ⚡ MODAL ÉDITION RAPIDE (In-Situ) */}
      <QuickEditModal availableCategories={availableCategories} />
    </div>
  );
}
