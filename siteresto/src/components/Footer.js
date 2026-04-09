import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-grid">
        <div className="footer-info">
          <div className="logo">
            <h1>RESTO<span>.</span></h1>
          </div>
          <p>Une expérience culinaire unique au cœur de la ville. Saveurs authentiques et ingrédients locaux.</p>
        </div>
        <div className="footer-links">
          <h4>Découvrir</h4>
          <ul>
            <li><a href="#home">Accueil</a></li>
            <li><a href="#menu">La Carte</a></li>
            <li><a href="#add">Réserver</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Coordonnées</h4>
          <p>123 Avenue des Saveurs<br />64000 Pau</p>
          <p>+33 5 59 00 00 00</p>
          <p>contact@resto.fr</p>
        </div>
        <div className="footer-social">
          <h4>Suivez-nous</h4>
          <div className="social-links">
            <a href="#instagram" className="social-icon">Instagram</a>
            <a href="#facebook" className="social-icon">Facebook</a>
            <a href="#tripadvisor" className="social-icon">TripAdvisor</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 RESTO. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
