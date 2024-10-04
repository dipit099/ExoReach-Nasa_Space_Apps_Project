import React from 'react';
import './ExoCard.css';

const ExoCard = ({ pl_name, pl_category, pl_rade, pl_cmasse, sy_dist, pl_image }) => {
    const getCategoryClass = (category) => {
        switch (category) {
            case 'Neptune-like':
                return 'neptune-like';
            case 'Super Earth':
                return 'super-earth';
            case 'Gas Giant':
                return 'gas-giant';
            case 'Terrestrial':
                return 'terrestrial';
            default:
                return 'default-category';
        }
    };

    const trimName = (name, maxLength) => {
        if (name.length > maxLength) {
            return name.slice(0, maxLength) + '...';
        }
        return name;
    };

    return (
        <div className={`exo-card ${getCategoryClass(pl_category)}`}>
            <div className="exo-card-category">{pl_category}</div>
            <img src={pl_image} alt={pl_name} className="exo-card-image" />
            <div className="exo-card-content">
                <h3>{trimName(pl_name, 13)}</h3> {/* Change 12 to desired max length */}
                <p>Radius: {pl_rade} Earth radii</p>
                <p>Mass: {pl_cmasse}</p>
                <p>Distance: {sy_dist} light years</p>
            </div>
        </div>
    );
};

export default ExoCard;
