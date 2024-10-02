import React from 'react';
import './PlanetCard.css';

const PlanetCard = ({ pl_name, sy_dist, pl_masse, disc_year, imageSrc }) => {
  return (
    <div className="most-clicked-card">
      <div className="card-content">
        <div className="image-container">
          <img src={imageSrc} alt={pl_name} className="planet-image" />
        </div>
        <div className="planet-info">
          <div className="planet-name">{pl_name}</div>
          {/* <div className="planet-details">
            <p><strong>Distance from Earth:</strong> {sy_dist} light-years</p>
            <p><strong>Mass:</strong> {pl_masse} Earth masses</p>
            <p><strong>Discovery Year:</strong> {disc_year}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PlanetCard;
