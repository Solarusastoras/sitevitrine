import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/mockData';
import './SubCategorySelection.scss';

const SubCategorySelection = ({ gender }) => {
  const genderTitle = gender === 'homme' ? 'Homme' : 'Femme';

  return (
    <div className="subcat-selection">
      <div className="subcat-header">
        <h1>Collection {genderTitle}</h1>
        <p>Choisissez une catégorie pour explorer nos pièces exclusives.</p>
      </div>
      
      <div className="subcat-grid">
        {CATEGORIES.map((cat) => (
          <Link 
            key={cat.id} 
            to={`/${gender}/${cat.id}`} 
            className="subcat-card"
          >
            <div className="subcat-card-content">
              <h3>{cat.name}</h3>
              <span className="subcat-arrow">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubCategorySelection;
