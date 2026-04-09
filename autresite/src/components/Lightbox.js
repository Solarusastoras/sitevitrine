import React from 'react';
import './Lightbox.scss';

const Lightbox = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>&times;</button>
        <img src={imageUrl} alt="Product Large View" className="lightbox-image" />
      </div>
    </div>
  );
};

export default Lightbox;
