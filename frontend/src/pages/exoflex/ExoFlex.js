import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ExoCard from "../../components/exocard/ExoCard";
import { AuthContext } from "../../config/AuthContext";
import SERVER_URL from "../../config/SERVER_URL";
import "./ExoFlex.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import SelectedCards from "../../components/selected_planets/SelectedPlanets";
import ExoFlexResults from "../../components/ExoFlexResults/ExoFlexResults";
const ExoFlex = () => {
  const { userId } = useContext(AuthContext);
  const [userPlanets, setUserPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlanets, setSelectedPlanets] = useState([]);
  const [rulesAcknowledged, setRulesAcknowledged] = useState(false);
  const [serverPlanets, setServerPlanets] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [roundResults, setRoundResults] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  useEffect(() => {
    const fetchUserPlanets = async () => {
      try {
        const response = await axios.post(`${SERVER_URL}/exoflex/user-cards`, {
          userId,
        });

        if (response.data.success) {
          setUserPlanets(response.data.userPlanets);
        } else {
          setError("Failed to fetch planets");
        }
      } catch (err) {
        setError("An error occurred while fetching planets");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlanets();
  }, [userId]);

  const selectPlanet = (planet) => {
    if (selectedPlanets.length < 3 && !selectedPlanets.includes(planet)) {
      setSelectedPlanets([...selectedPlanets, planet]);
    }
  };

  const deselectPlanet = (planet) => {
    setSelectedPlanets(selectedPlanets.filter((p) => p !== planet));
  };

  const startGame = async () => {
    console.log("Selected Planets before starting the game:", selectedPlanets);
    try {
      const response = await axios.post(`${SERVER_URL}/exoflex/play`, {
        planetInfo: selectedPlanets,
        userId,
      });
      console.log("Server Response:", response.data);
      if (response.data.success) {
        console.log("Setting server planets:", response.data.serverPlanets);
        setServerPlanets(response.data.serverPlanets);
        setRoundResults(response.data.round_results); // Set round results
        setFinalResult(response.data.result); // Set final result
        setGameStarted(true);
      } else {
        console.error("Error response from server:", response.data);
        setError("An error occurred while starting the game");
      }
    } catch (err) {
      console.error("Catch error:", err);
      setError("An error occurred while starting the game");
    }
  };

  const acknowledgeRules = () => {
    setRulesAcknowledged(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Navbar />
      <div className="exo-flex-container">
        {gameStarted && serverPlanets.length > 0 ? (
          <>
            <div className="explore-title">ExoFlex</div>``
            <div className="exo-flex-results">
              <h3 className="round-results-title">Round Results:</h3>
              {roundResults.map((result, index) => (
                <>
                  <div key={index} className="round-result">
                    <p className="round-text">Round {index + 1}:</p>
                    <div className="result-comparison">
                      <div className="user-card">
                        <p>You:</p>
                        <ExoCard
                          pl_name={selectedPlanets[index].pl_name}
                          pl_category={selectedPlanets[index].pl_category}
                          pl_rade={selectedPlanets[index].pl_rade}
                          pl_cmasse={selectedPlanets[index].pl_cmasse}
                          sy_dist={selectedPlanets[index].sy_dist}
                          pl_image={selectedPlanets[index].pl_image}
                        />
                      </div>
                      <div className="vs-container">
                        <span>VS</span>
                      </div>
                      <div className="computer-card">
                        <p>Computer:</p>
                        <ExoCard
                          pl_name={serverPlanets[index].pl_name}
                          pl_category={serverPlanets[index].pl_category}
                          pl_rade={serverPlanets[index].pl_rade}
                          pl_cmasse={serverPlanets[index].pl_cmasse}
                          sy_dist={serverPlanets[index].sy_dist}
                          pl_image={serverPlanets[index].pl_image}
                        />
                      </div>
                    </div>
                    <p className="round-text">
                      Result:{" "}
                      {result === 1
                        ? "You Win!"
                        : result === 0
                        ? "You Lose!"
                        : "Draw!"}
                    </p>
                  </div>
                  <br />
                </>
              ))}
              <h4 className="final-result-title">
                Score: {roundResults.filter((r) => r === 1).length}/
                {roundResults.length}
                {finalResult === 1
                  ? " - YOU WON!"
                  : finalResult === 0
                  ? " - YOU LOST!"
                  : ""}
              </h4>
              <div className="exoflex-button-container">
                <br />
                <br />
                <button
                  onClick={() => {
                    setGameStarted(false);
                    setSelectedPlanets([]); // Reset selected planets
                  }}
                  className="start-game-button"
                >
                  Play Again
                </button>
              </div>
            </div>
          </>
        ) : !rulesAcknowledged ? (
          <div className="game-rules">
            <div className="explore-title">ExoFlex</div>
            <div className="anton-regular-exoflex">Game Description:</div>
            <p>
              ExoFlex is a space-themed card game where players use exoplanet
              data to compete against server-generated planet cards. Each player
              selects three planets with unique characteristics, such as radius,
              mass, and distance from their star. The game will generate three
              opposing planet cards from the server, and players will compete
              round-by-round based on these attributes.
            </p>
            <div className="anton-regular-exoflex">Game Rules:</div>
            <ul>
              <li>
                Choose Three Planets: Each player selects three planets from
                their deck to challenge the game.
              </li>
              <li>Planet Comparison:</li>
              <ul>
                <li>
                  Round 1: Compare the radius (pl_rade) of the player's 1st
                  planet with the server's 1st planet. The planet with the
                  larger radius wins.
                </li>
                <li>
                  Round 2: Compare the mass (pl_cmasse) of the player's 2nd
                  planet with the server's 2nd planet. The planet with the
                  larger mass wins.
                </li>
                <li>
                  Round 3: Compare the distance from the star (sy_dist) of the
                  player's 3rd planet with the server's 3rd planet. The planet
                  with the smaller distance wins.
                </li>
              </ul>
              <li>
                Handling Null Values: If any planet attribute (radius, mass, or
                distance) is missing, the round automatically goes to the
                player.
              </li>
              <li>
                Winning: The player must win at least two out of three rounds to
                claim victory in that match.
              </li>
            </ul>
            <p>
              Challenge the cosmos with strategy and climb the leaderboard by
              competing against the server's planets!
            </p>
            <button
              onClick={acknowledgeRules}
              className="acknowledge-rules-button"
            >
              Acknowledge Rules
            </button>
          </div>
        ) : (
          <div>
            <div className="explore-title">ExoFlex</div>
            <div className="selection-instruction">
              <p>
                Please select 3 cards wisely. Each planet has unique attributes
                that will influence your game strategy!
              </p>
            </div>
            <div className="exo-card-list">
              <SelectedCards selectedPlanets={selectedPlanets} />
              {userPlanets.map((planet) => (
                <div key={planet.pl_name} className="exo-card-wrapper">
                  <ExoCard
                    pl_name={planet.pl_name}
                    pl_category={planet.pl_category}
                    pl_rade={planet.pl_rade}
                    pl_cmasse={planet.pl_cmasse}
                    sy_dist={planet.sy_dist}
                    pl_image={planet.pl_image}
                  />
                  <br />
                  <div className="button-container">
                    {selectedPlanets.includes(planet) ? (
                      <button
                        className="deselect-button"
                        onClick={() => deselectPlanet(planet)}
                      >
                        Deselect
                      </button>
                    ) : (
                      <button
                        className="select-button"
                        onClick={() => selectPlanet(planet)}
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <br />
            <div className="exoflex-button-container">
              <button
                className="start-game-button"
                onClick={startGame}
                disabled={selectedPlanets.length !== 3}
              >
                Start Game
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="blank"></div>
      <Footer />
    </>
  );
};

export default ExoFlex;
