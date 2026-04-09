import { useParams, Link } from 'react-router-dom';
import './Minimaliste.scss';
import { HERO_CONTENT } from '../../data/mockData';
import SubCategorySelection from '../../components/SubCategorySelection';
import { MapPin, ExternalLink } from 'lucide-react';
import MapEmbed from '../../components/MapEmbed';

export default function Minimaliste({ onProductClick, products, storeInfo }) {
  const { gender, subCategory } = useParams();

  // Filter products based on URL params
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
    : (gender ? `Collection ${gender.charAt(0).toUpperCase() + gender.slice(1)}` : 'Nouvelle Collection');

  const isSelectionPage = gender && !subCategory;

  const handleDirections = () => {
    const el = document.getElementById('m-store-map');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const input = document.getElementById('itinerary-input');
      if (input) input.focus();
    }, 500);
  };

  return (
    <div className="theme-minimaliste">
      <header className="m-header">
        <Link to="/" className="m-logo">VÊTEMENTS</Link>
        <nav className="m-nav">
          <Link to="/">Accueil</Link>
          <Link to="/homme">Homme</Link>
          <Link to="/femme">Femme</Link>
        </nav>
      </header>

      {/* Hero only on Home or Gender landing */}
      {!subCategory && !gender && (
        <section className="m-hero">
          <div className="m-hero-text">
            <h1>{HERO_CONTENT.title}</h1>
            <p>{HERO_CONTENT.subtitle}</p>
            <button className="m-btn">{HERO_CONTENT.ctaText}</button>
          </div>
          <div className="m-hero-img-container">
            <img src={HERO_CONTENT.heroImage} alt="Hero" className="m-hero-img" />
          </div>
        </section>
      )}

      {subCategory && (
        <div className="m-breadcrumb">
          <Link to="/">Accueil</Link> / <Link to={`/${gender}`}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</Link> / <span>{subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}</span>
        </div>
      )}

      {isSelectionPage ? (
        <SubCategorySelection gender={gender} />
      ) : (
        <section className="m-collection">
          <div className="m-section-header">
            <h2>{sectionTitle}</h2>
            <span className="m-line"></span>
          </div>

          <div className="m-grid">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="m-product-card"
                onClick={() => onProductClick(product)}
                style={{ cursor: 'pointer' }}
              >
                <div className="m-img-wrapper">
                  <img src={product.image} alt={product.name} />
                  {product.isNew && <span className="m-badge">Nouveau</span>}
                  {!product.isNew && product.tag === 'promo' && <span className="m-badge m-promo">Promo</span>}
                </div>
                <div className="m-product-info">
                  <h3>{product.name}</h3>
                  <p className="m-price">{product.price.toFixed(2)} €</p>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && <p className="m-empty">Aucun produit trouvé dans cette catégorie.</p>}
          </div>
        </section>
      )}

      <section className="m-info-section">
        <div className="m-info-container">
          <div className="m-info-item">
            <h3>Notre Boutique</h3>
            <p>{storeInfo.address}</p>
            <button className="m-link-btn" onClick={handleDirections}>
              Itinéraire <ExternalLink size={12} />
            </button>
          </div>
          <div className="m-info-item">
            <h3>Horaires</h3>
            <ul className="m-hours">
              {storeInfo.hours.map((h, i) => (
                <li key={i}>
                  <span className="m-day">{h.day}</span>
                  <span className="m-time">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="m-map-box" id="m-store-map">
          <MapEmbed address={storeInfo.address} className="m-real-map" />
        </div>
      </section>

      <footer className="m-footer">
        <div className="m-footer-content">
          <p>&copy; 2026 Vêtements Studio. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
