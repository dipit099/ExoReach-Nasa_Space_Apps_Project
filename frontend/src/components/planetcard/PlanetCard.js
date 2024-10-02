import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './PlanetCard.css';

const PlanetCard = ({ pl_name, sy_dist, pl_masse, disc_year, imageSrc }) => {
  // Replace spaces in pl_name with underscores
  const formattedPlName = pl_name.replace(/\s+/g, '_');

  return (
    <Link to={`/exoplanet/${formattedPlName}`} className="most-clicked-card"> {/* Use formattedPlName */}
      <div className="card-content">
        <div className="image-container">
          <img src={imageSrc} alt={pl_name} className="planet-image" />
        </div>
        <div className="planet-info">
          <div className="planet-name">{pl_name}</div>
          <div className="planet-details">
            <strong>Parsecs from Earth:</strong>&nbsp;{sy_dist} 
            <br />
            <strong>Mass:</strong>&nbsp;{pl_masse} Earth masses
            <br />
            <strong>Discovery Year:</strong>&nbsp;{disc_year}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlanetCard;
