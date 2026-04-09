import { useParams, Link } from 'react-router-dom';
import './Luxe.scss';
import { HERO_CONTENT } from '../../data/mockData';
import SubCategorySelection from '../../components/SubCategorySelection';
import { MapPin, ArrowRight } from 'lucide-react';
import MapEmbed from '../../components/MapEmbed';

export default function Luxe({ onProductClick, products, storeInfo }) {
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
    : (gender ? `Collection ${gender.charAt(0).toUpperCase() + gender.slice(1)}` : 'Pièces Exclusives');

  const isSelectionPage = gender && !subCategory;

  const handleDirections = () => {
    const el = document.getElementById('l-store-map');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const input = document.getElementById('itinerary-input');
      if (input) input.focus();
    }, 500);
  };

  return (
    <div className="theme-luxe">
      <div className="l-border-frame"></div>
      <header className="l-header">
        <nav className="l-nav">
          <Link to="/">Accueil</Link>
          <Link to="/homme">Homme</Link>
          <Link to="/femme">Femme</Link>
        </nav>
        <Link to="/" className="l-logo">Maison Vêtement</Link>
      </header>

      {!subCategory && !gender && (
        <section className="l-hero">
            <div className="l-hero-inner">
            <h1 className="l-title">{HERO_CONTENT.title}</h1>
            <p className="l-subtitle">{HERO_CONTENT.subtitle}</p>
            <button className="l-btn-elegant"><span>{HERO_CONTENT.ctaText}</span></button>
            </div>
            <div className="l-hero-backdrop" style={{ backgroundImage: `url(${HERO_CONTENT.heroImage})`}}></div>
        </section>
      )}

      {subCategory && (
        <div className="l-breadcrumb">
            <Link to="/">Accueil</Link> <span>/</span> <Link to={`/${gender}`}>{gender}</Link> <span>/</span> <span className="active">{subCategory}</span>
        </div>
      )}

      {isSelectionPage ? (
        <SubCategorySelection gender={gender} />
      ) : (
        <section className="l-collection">
          <h2 className="l-section-title">{sectionTitle}</h2>
          <div className="l-grid">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className={`l-product-card ${index % 2 === 0 ? 'offset-down' : 'offset-up'}`}
                onClick={() => onProductClick(product)}
                style={{ cursor: 'pointer' }}
              >
                <div className="l-img-frame">
                   {product.isNew && <span className="l-tag-overlay">Nouveau</span>}
                   {!product.isNew && product.tag === 'promo' && <span className="l-tag-overlay l-promo">Promo</span>}
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="l-product-details">
                  <p className="l-category">{product.subCategory}</p>
                  <h3>{product.name}</h3>
                  <p className="l-price">{product.price.toFixed(2)} €</p>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && <p className="l-empty">Aucun produit trouvé.</p>}
          </div>
        </section>
      )}

      <section className="l-maison-section">
        <div className="l-maison-container">
          <div className="l-maison-info">
            <span className="l-pre-title">L'EXPÉRIENCE</span>
            <h2 className="l-maison-title">La Maison Vendôme</h2>
            <p className="l-maison-desc">
              Découvrez l'élégance intemporelle dans notre écrin parisien. Un lieu dédié à la haute couture et au service personnalisé.
            </p>
            
            <div className="l-maison-details">
              <div className="l-detail-item">
                <h4>ADRESSE</h4>
                <p>{storeInfo.address}</p>
                <button className="l-btn-text" onClick={handleDirections}>
                  OBTENIR L'ITINÉRAIRE <ArrowRight size={14} />
                </button>
              </div>
              <div className="l-detail-item">
                <h4>HORAIRES</h4>
                <ul className="l-hours-list">
                  {storeInfo.hours.map((h, i) => (
                    <li key={i}>
                      <span className="day">{h.day}</span>
                      <span className="time">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="l-maison-map" id="l-store-map">
            <MapEmbed address={storeInfo.address} className="l-real-map" />
          </div>
        </div>
      </section>

      <footer className="l-footer">
        <h2 className="l-logo">Maison Vêtement</h2>
        <p>Paris • Milano • New York</p>
      </footer>
    </div>
  );
}
