import React from "react";
import "./ExoFlexResults.css";

const ExoFlexResults = ({ selectedPlanets, serverPlanets, round_results, result }) => {

    if (!Array.isArray(serverPlanets) || serverPlanets.length === 0) {
        return <p>No planets available for comparison.</p>;
    }

    // Check if selectedPlanets is an array
    if (!Array.isArray(selectedPlanets) || selectedPlanets.length === 0) {
        return <p>No selected planets available.</p>;
    }
    return (
        <div className="exo-flex-results-container">
            <h2 className="results-title">Game Results</h2>
            <div className="results-section">
                <h3>Your Selected Planets:</h3>
                <div className="planet-list">
                    {selectedPlanets.map((planet) => (
                        <div key={planet.pl_name} className="planet-card">
                            <h4>{planet.pl_name}</h4>
                            <p>Category: {planet.pl_category}</p>
                            <p>Radius: {planet.pl_rade}</p>
                            <p>Mass: {planet.pl_cmasse}</p>
                            <p>Distance: {planet.sy_dist} light-years</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="results-section">
                <h3>Server Generated Planets:</h3>
                <div className="planet-list">
                    {serverPlanets.map((planet) => (
                        <div key={planet.pl_name} className="planet-card">
                            <h4>{planet.pl_name}</h4>
                            <p>Category: {planet.pl_category}</p>
                            <p>Radius: {planet.pl_rade}</p>
                            <p>Mass: {planet.pl_cmasse}</p>
                            <p>Distance: {planet.sy_dist} light-years</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="results-section">
                <h3>Round Results:</h3>
                <ul>
                    {round_results.map((result, index) => (
                        <li key={index}>
                            Round {index + 1}: {result === 1 ? "You Win!" : result === 0 ? "You Lose!" : "Draw!"}
                        </li>
                    ))}
                </ul>
                <h4>
                    Final Result: {result === 1 ? "You Won!" : result === 0 ? "You Lost!" : "It's a Draw!"}
                </h4>
            </div>
        </div>
    );
};

export default ExoFlexResults;
