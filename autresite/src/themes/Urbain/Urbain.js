import { useParams, Link } from 'react-router-dom';
import './Urbain.scss';
import { HERO_CONTENT } from '../../data/mockData';
import SubCategorySelection from '../../components/SubCategorySelection';
import { MapPin, Navigation } from 'lucide-react';
import MapEmbed from '../../components/MapEmbed';

export default function Urbain({ onProductClick, products, storeInfo }) {
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

  const displayCategory = subCategory || gender || 'LATEST DROPS';

  const isSelectionPage = gender && !subCategory;

  const handleDirections = () => {
    const el = document.getElementById('u-store-map');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const input = document.getElementById('itinerary-input');
      if (input) input.focus();
    }, 500);
  };

  return (
    <div className="theme-urbain">
      <header className="u-header">
        <Link to="/" className="u-logo">DRIP_2026.</Link>
        <nav className="u-nav">
          <Link to="/">Home</Link>
          <Link to="/homme">Homme</Link>
          <Link to="/femme">Femme</Link>
        </nav>
      </header>

      {!subCategory && !gender && (
        <div className="u-bento-hero">
            <div className="u-bento-item u-hero-main">
            <h1>STREET<br/>SYNDICATE</h1>
            <p>{HERO_CONTENT.subtitle}</p>
            <button className="u-btn-neon">EXPLORE THE DROP</button>
            </div>
            <div className="u-bento-item u-hero-img1" style={{ backgroundImage: `url(${products[0]?.image})` }}></div>
            <div className="u-bento-item u-hero-img2" style={{ backgroundImage: `url(${products[3]?.image})` }}></div>
            <div className="u-bento-item u-hero-promo">
            <h2>-20%</h2>
            <p>CODE: CYBER26</p>
            </div>
        </div>
      )}

      {subCategory && (
        <div className="u-breadcrumb">
          <Link to="/">HOME</Link> // <Link to={`/${gender}`}>{gender.toUpperCase()}</Link> // <span className="active">{subCategory.toUpperCase()}</span>
        </div>
      )}

      {isSelectionPage ? (
        <SubCategorySelection gender={gender} />
      ) : (
        <section className="u-collection">
          <h2 className="u-marquee">
            <span>{displayCategory.toUpperCase()} /// {displayCategory.toUpperCase()} /// {displayCategory.toUpperCase()} /// </span>
          </h2>
          <div className="u-grid">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="u-product-card"
                onClick={() => onProductClick(product)}
                style={{ cursor: 'pointer' }}
              >
                <div className="u-img-wrapper">
                  <img src={product.image} alt={product.name} />
                  {product.isNew && <div className="u-tag">NEW</div>}
                  {!product.isNew && product.tag === 'promo' && <div className="u-tag" style={{ background: '#ff4444', color: 'white' }}>PROMO</div>}
                </div>
                <div className="u-product-info">
                  <h3>{product.name}</h3>
                  <div className="u-price-row">
                    <span className="u-price">{product.price.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && <p className="u-empty">DRIP NOT FOUND ///</p>}
          </div>
        </section>
      )}

      <section className="u-store-section">
        <div className="u-store-content">
          <div className="u-store-info">
            <h2 className="u-marquee-short">LOCATIONS /// LAB HOURS</h2>
            
            <div className="u-info-grid">
              <div className="u-info-card">
                <h3>VISIT THE LAB</h3>
                <p><MapPin size={14} /> {storeInfo.address}</p>
                <button className="u-btn-outline" onClick={handleDirections}>
                  <Navigation size={14} /> GET DIRECTIONS
                </button>
              </div>

              <div className="u-info-card">
                <h3>OPERATING HOURS</h3>
                {storeInfo.hours.map((h, i) => (
                  <div key={i} className="u-hour-row">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="u-map-container" id="u-store-map">
            <MapEmbed address={storeInfo.address} className="u-real-map" />
          </div>
        </div>
      </section>

      <footer className="u-footer">
        <div className="u-logo">DRIP_2026.</div>
        <p>JOIN THE UNDERGROUND ///</p>
      </footer>
    </div>
  );
}
