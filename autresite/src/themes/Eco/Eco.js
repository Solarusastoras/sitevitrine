import { useParams, Link } from 'react-router-dom';
import './Eco.scss';
import { HERO_CONTENT } from '../../data/mockData';
import SubCategorySelection from '../../components/SubCategorySelection';
import { Leaf, Map, Compass } from 'lucide-react';
import MapEmbed from '../../components/MapEmbed';

export default function Eco({ onProductClick, products, storeInfo }) {
  const { gender, subCategory } = useParams();

  const filteredProducts = products.filter(p => {
    // If we're on the home page (no gender, no subCategory), only show products with 'isNew' tag
    if (!gender && !subCategory) {
      return p.isNew;
    }

    const matchGender = !gender || p.gender.toLowerCase() === gender.toLowerCase();
    const matchSubCat = !subCategory || p.subCategory.toLowerCase() === subCategory.toLowerCase();
    return matchGender && matchSubCat;
  });

  const sectionTitle = subCategory 
    ? `Collection ${subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}`
    : (gender ? `Collection ${gender.charAt(0).toUpperCase() + gender.slice(1)}` : 'Collection Essentielle');

  const isSelectionPage = gender && !subCategory;

  const handleDirections = () => {
    const el = document.getElementById('e-store-map');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const input = document.getElementById('itinerary-input');
      if (input) input.focus();
    }, 500);
  };

  return (
    <div className="theme-eco">
      <header className="e-header">
        <Link to="/" className="e-logo">Terra.</Link>
        <nav className="e-nav">
          <Link to="/">Accueil</Link>
          <Link to="/homme">Homme</Link>
          <Link to="/femme">Femme</Link>
        </nav>
      </header>

      {!subCategory && !gender && (
        <section className="e-hero">
            <div className="e-hero-img-box">
            <img src="https://images.unsplash.com/photo-1542295669297-4d352b042bca?q=80&w=1200&auto=format&fit=crop" alt="Nature" />
            </div>
            <div className="e-hero-text">
            <h1>Naturellement<br/>Vous.</h1>
            <p>{HERO_CONTENT.subtitle}</p>
            <button className="e-btn">{HERO_CONTENT.ctaText}</button>
            </div>
        </section>
      )}

      {subCategory && (
        <div className="e-breadcrumb">
          <Link to="/">ACCUEIL</Link> • <Link to={`/${gender}`}>{gender.toUpperCase()}</Link> • <span className="active">{subCategory.toUpperCase()}</span>
        </div>
      )}

      {isSelectionPage ? (
        <SubCategorySelection gender={gender} />
      ) : (
        <section className="e-collection">
          <div className="e-section-title">
            <h2>{sectionTitle}</h2>
            <p>Matières durables, design intemporel.</p>
          </div>
          
          <div className="e-grid">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="e-product-card"
                onClick={() => onProductClick(product)}
                style={{ cursor: 'pointer' }}
              >
                <div className="e-img-wrapper">
                  {product.isNew && <span className="e-badge">Nouveau</span>}
                  {!product.isNew && product.tag === 'promo' && <span className="e-badge e-promo">Promo</span>}
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="e-product-info">
                  <h3>{product.name}</h3>
                  <p className="e-price">{product.price.toFixed(2)} €</p>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && <p className="e-empty">En rupture de stock pour cette sélection.</p>}
          </div>
        </section>
      )}

      <section className="e-location-section">
        <div className="e-location-card">
          <div className="e-location-header">
             <Leaf size={20} className="e-leaf-icon" />
             <h2>Notre Écrin Naturel</h2>
          </div>
          
          <div className="e-location-content">
            <div className="e-location-text">
              <p className="e-address"><Map size={16} /> {storeInfo.address}</p>
              <div className="e-hours-box">
                <h4>HORAIRES</h4>
                <div className="e-hours-grid">
                  {storeInfo.hours.map((h, i) => (
                    <div key={i} className="e-hour-item">
                      <span className="day">{h.day}</span>
                      <span className="time">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="e-btn-nav" onClick={handleDirections}>
                 <Compass size={16} /> NOUS TROUVER
              </button>
            </div>
            <div className="e-location-map" id="e-store-map">
               <MapEmbed address={storeInfo.address} className="e-real-map" />
            </div>
          </div>
        </div>
      </section>

      <footer className="e-footer">
        <div className="e-footer-grid">
           <div>
              <h3>Terra.</h3>
              <p>Mode éthique et responsable.</p>
           </div>
           <div>
              <p>Polices, retours, FAQ</p>
           </div>
        </div>
      </footer>
    </div>
  );
}
