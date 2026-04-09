import React from 'react';
import './MapSection.scss';

const MapSection = () => {
  return (
    <section className="map-section">
      <div className="map-container">
        <div className="map-frame">
          <div className="map-title-bar">
            <h3>Retrouvez-nous</h3>
          </div>
          <div className="map-wrapper">
            <iframe
              title="Restaurant Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.0242258414455!2d-0.364426523996!3d43.29913207112101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd56488d0701830!2s64000%20Pau%2C%20France!5e0!3m2!1sfr!2sfr!4v1711562200000!5m2!1sfr!2sfr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="map-info">
            <p>123 Avenue des Saveurs, 64000 Pau</p>
            <p>+33 5 59 00 00 00</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
