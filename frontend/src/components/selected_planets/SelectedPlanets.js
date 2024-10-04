// src/components/SelectedCards.js
import React from "react";
import './SelectedPlanets.css'
const SelectedCards = ({ selectedPlanets }) => {
  return (
    <div className="selected-cards-container">
    <h3>Selected Cards:</h3>
    <ul>
      {selectedPlanets.map((planet, index) => (
        <li key={planet.pl_name}>
          {index + 1}: {planet.pl_name}
        </li>
      ))}
      {selectedPlanets.length === 3 && (
        <li style={{ color: 'red', fontWeight: 'bold' }}>Can't select more</li>
      )}
    </ul>
  </div>
  
  );
};

export default SelectedCards;
