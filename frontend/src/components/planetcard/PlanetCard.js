import React from 'react';
import './PlanetCard.css';

const PlanetCard = ({ name, imageSrc }) => {
  return (
    <div className="most-clicked-card">
      <div className="card-content">
        <div className="image-container">
          <img src={imageSrc} alt={name} className="planet-image" />
        </div>
        <div className="planet-name">{name}</div>
      </div>
    </div>
  );
};

export default PlanetCard;