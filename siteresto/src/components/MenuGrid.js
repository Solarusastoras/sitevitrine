import React from 'react';
import './MenuGrid.scss';

const MenuGrid = ({ dishes }) => {
  const categories = ['Entrée', 'Plats', 'Dessert', 'Boisson'];

  const groupedDishes = categories.reduce((acc, category) => {
    acc[category] = dishes.filter(dish => dish.category === category);
    return acc;
  }, {});

  // For any dish with an unknown category, we can put it in 'Plats' or handle it
  const otherDishes = dishes.filter(dish => !categories.includes(dish.category));
  if (otherDishes.length > 0) {
    groupedDishes['Plats'] = [...(groupedDishes['Plats'] || []), ...otherDishes];
  }

  return (
    <section className="menu-section" id="menu">
      <div className="container">
        <div className="section-header">
          <span className="subtitle">Notre Carte</span>
          <h2>Découvrez nos saveurs</h2>
        </div>

        {categories.map((category) => (
          groupedDishes[category] && groupedDishes[category].length > 0 && (
            <div key={category} className="category-section">
              <h3 className="category-title">{category}</h3>
              <div className="menu-grid">
                {groupedDishes[category].map((dish, index) => (
                  <div className="menu-card" key={index}>
                    <div className="card-image">
                      <img src={dish.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500"} alt={dish.name} />
                      <span className="card-price">{dish.price}€</span>
                    </div>
                    <div className="card-content">
                      <h3>{dish.name}</h3>
                      <p>{dish.description}</p>
                      <div className="card-footer">
                        <span className="category">{dish.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </section>
  );
};

export default MenuGrid;
