import React from 'react';
import './Hero.scss';

const Hero = ({ platDuJour }) => {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-text">
          <span className="badge">Plat du Jour</span>
          <h2>{platDuJour.name}</h2>
          <p>{platDuJour.description}</p>
          <div className="hero-price">
            <span className="price">{platDuJour.price}€</span>
          </div>
        </div>
        <div className="hero-image">
           <div className="image-card">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000" alt="Plat du jour" />
              <div className="glass-effect"></div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
