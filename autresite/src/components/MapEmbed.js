import React, { useState, useEffect } from 'react';
import { Navigation, Search, X, Loader2, MapPin } from 'lucide-react';
import './MapEmbed.scss';

const MapEmbed = ({ address, className }) => {
  const [origin, setOrigin] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [mapUrl, setMapUrl] = useState('');

  const encodedDest = encodeURIComponent(address);

  // Initial URL (simple marker)
  useEffect(() => {
    setMapUrl(`https://maps.google.com/maps?q=${encodedDest}&t=&z=15&ie=UTF8&iwloc=&output=embed`);
  }, [address, encodedDest]);

  const handleCalculate = (e) => {
    if (e) e.preventDefault();
    if (!origin.trim()) return;
    const encodedOrigin = encodeURIComponent(origin);
    setMapUrl(`https://maps.google.com/maps?saddr=${encodedOrigin}&daddr=${encodedDest}&output=embed`);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const geoOrigin = `${latitude},${longitude}`;
        setOrigin("Ma position actuelle");
        setMapUrl(`https://maps.google.com/maps?saddr=${geoOrigin}&daddr=${encodedDest}&output=embed`);
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Impossible d'obtenir votre position. Veuillez saisir une adresse manuellement.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const resetMap = () => {
    setOrigin('');
    setMapUrl(`https://maps.google.com/maps?q=${encodedDest}&t=&z=15&ie=UTF8&iwloc=&output=embed`);
  };

  return (
    <div className={`map-embed-wrapper ${className || ''}`}>
      <div className="map-controls">
        <form className="map-search-bar" onSubmit={handleCalculate}>
          <div className="input-with-icon">
            <MapPin size={14} className="icon-left" />
            <input 
              type="text" 
              placeholder="Départ (ville, adresse...)" 
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              id="itinerary-input"
            />
            {origin && <X size={14} className="icon-clear" onClick={resetMap} />}
          </div>
          <button type="submit" className="btn-calc" title="Calculer l'itinéraire">
            <Search size={16} />
          </button>
          <button 
            type="button" 
            className={`btn-geo ${isLocating ? 'loading' : ''}`} 
            onClick={handleGeolocation}
            disabled={isLocating}
            title="Utiliser ma position actuelle"
          >
            {isLocating ? <Loader2 size={16} className="animate-spin" /> : <Navigation size={16} />}
          </button>
        </form>
      </div>

      <div className="map-iframe-container">
        <iframe
          title="Google Maps"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          src={mapUrl}
          style={{ border: 0 }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MapEmbed;
