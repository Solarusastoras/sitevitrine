import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Vintage.scss';
import { HERO_CONTENT } from '../../data/mockData';
import SubCategorySelection from '../../components/SubCategorySelection';
import { MapPin } from 'lucide-react';
import MapEmbed from '../../components/MapEmbed';

export default function Vintage({ onProductClick, products, storeInfo }) {
  const { gender, subCategory } = useParams();

  const filteredProducts = products.filter(p => {
    if (!gender && !subCategory) {
      return p.isNew;
    }
    const matchGender = !gender || p.gender.toLowerCase() === gender.toLowerCase();
    const matchSubCat = !subCategory || p.subCategory.toLowerCase() === subCategory.toLowerCase();
    return matchGender && matchSubCat;
  });

  const sectionLabel = subCategory 
    ? `~ Hors-Série ${subCategory.toUpperCase()} ~`
    : (gender ? `~ Sélection ${gender.toUpperCase()} ~` : '~ Nos Articles Classiques ~');

  const isSelectionPage = gender && !subCategory;

  const handleDirections = () => {
    const el = document.getElementById('v-store-map');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const input = document.getElementById('itinerary-input');
      if (input) input.focus();
    }, 500);
  };

  return (
    <div className="theme-vintage">
      <div className="v-paper-texture"></div>
      
      <header className="v-header">
        <Link to="/" className="v-logo">The Retro Dept.</Link>
        <nav className="v-nav">
          <Link to="/">Accueil</Link>
          <Link to="/homme">Homme</Link>
          <Link to="/femme">Femme</Link>
        </nav>
      </header>

      {!subCategory && !gender && (
        <section className="v-hero">
            <div className="v-polaroid-container">
            <div className="v-polaroid">
                <img src={HERO_CONTENT.heroImage} alt="Vintage" />
                <div className="v-polaroid-caption">Été '26</div>
            </div>
            </div>
            <div className="v-hero-text">
            <h1>{HERO_CONTENT.title}</h1>
            <p>{HERO_CONTENT.subtitle}</p>
            <button className="v-btn">Commander</button>
            </div>
        </section>
      )}

      {subCategory && (
        <div className="v-breadcrumb">
          <Link to="/">RETOUR À L'ACCUEIL</Link> :: <Link to={`/${gender}`}>{gender.toUpperCase()}</Link> :: <span className="active">{subCategory.toUpperCase()}</span>
        </div>
      )}

      {isSelectionPage ? (
        <SubCategorySelection gender={gender} />
      ) : (
        <section className="v-collection">
          <div className="v-section-banner">
             <h2>{sectionLabel}</h2>
          </div>
          
          <div className="v-grid">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="v-product-card"
                onClick={() => onProductClick(product)}
                style={{ cursor: 'pointer' }}
              >
                <div className="v-img-wrapper">
                  {product.isNew && <div className="v-tag-vintage">NOUVEAU</div>}
                  {!product.isNew && product.tag === 'promo' && <div className="v-tag-vintage v-promo">PROMO</div>}
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="v-product-info">
                  <h3>{product.name}</h3>
                  <div className="v-separator">***</div>
                  <p className="v-price">{product.price.toFixed(2)} Fr</p>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && <p className="v-empty">ÉPUISÉ / SOLD OUT</p>}
          </div>
        </section>
      )}

      <section className="v-gazette-section">
        <div className="v-gazette-border">
          <div className="v-gazette-header">
            <span className="v-date">ÉDITION SPÉCIALE • 2026</span>
            <h2>L'ALMANACH DE LA BOUTIQUE</h2>
            <div className="v-double-line"></div>
          </div>
          
          <div className="v-gazette-body">
            <div className="v-gazette-col">
              <h3>NOTRE COMPTOIR</h3>
              <p className="v-drop-cap">{storeInfo.address}</p>
              <p>Venez nous rendre visite pour découvrir nos pièces rares et accessoires d'époque.</p>
              <button className="v-btn-retro" onClick={handleDirections}>
                 <MapPin size={14} /> NOUS REJOINDRE
              </button>
            </div>
            
            <div className="v-gazette-col">
              <h3>SERVICES & HEURES</h3>
              <ul className="v-retro-hours">
                {storeInfo.hours.map((h, i) => (
                  <li key={i}>
                    <strong>{h.day} :</strong> {h.time}
                  </li>
                ))}
              </ul>
              <div className="v-stamp">APPROUVÉ</div>
            </div>
          </div>
          
          <div className="v-gazette-map" id="v-store-map">
            <MapEmbed address={storeInfo.address} className="v-real-map" />
          </div>
        </div>
      </section>

      <footer className="v-footer">
         <p>THE RETRO DEPT. EST. 1990</p>
      </footer>
    </div>
  );
}
