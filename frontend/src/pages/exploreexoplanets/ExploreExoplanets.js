import React, { useState, useEffect } from "react";
import PlanetCard from "../../components/planetcard/PlanetCard";
import "./ExploreExoplanets.css";
import axios from "axios";
import SERVER_URL from "../../config/SERVER_URL";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import Pagination from "../../components/pagination/Pagination";
import SubNavbar from "../../components/navbar/SubNavbar";

const ExploreExoplanets = () => {
  const [planetTypes, setPlanetTypes] = useState("");
  const [discoveryMethods, setDiscoveryMethods] = useState("");
  const [telescopes, setTelescopes] = useState("");
  const [facilities, setFacilities] = useState("");
  const [plName, setPlName] = useState("");
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [planetsPerPage] = useState(15); // Set the number of planets to show per page

  useEffect(() => {
    fetchPlanets();
  }, [planetTypes, discoveryMethods, telescopes, facilities, plName]);

  const fetchPlanets = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${SERVER_URL}/explore_exoplanets`, {
        planetTypes,
        discoveryMethods,
        telescopes,
        facilities,
        plName,
      });
      if (response.data.success) {
        setPlanets(response.data.planets);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching planets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastPlanet = currentPage * planetsPerPage; // Last index of current page
  const indexOfFirstPlanet = indexOfLastPlanet - planetsPerPage; // First index of current page
  const currentPlanets = planets.slice(indexOfFirstPlanet, indexOfLastPlanet); // Get planets for current page

  // Calculate total pages
  const totalPages = Math.ceil(planets.length / planetsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <SubNavbar />
      <div className="explore-exoplanets">
        <div className="explore-title">Explore Exoplanets</div>
        <div className="filter-section">
          <div className="filter-title">Filter Exoplanets</div>
          <div className="filter-container classy-filter">
            <input
              className="filter-input classy-input"
              type="text"
              placeholder="Planet Name"
              value={plName}
              onChange={(e) => setPlName(e.target.value)}
            />
            <select
              className="classy-select"
              value={planetTypes}
              onChange={(e) => setPlanetTypes(e.target.value)}
            >
              <option value="">All</option>
              <option value="Super Earth">Super Earth</option>
              <option value="Neptune-like">Neptune-like</option>
              <option value="Gas Giant">Gas Giant</option>
              <option value="Terrestrial">Terrestrial</option>
            </select>

            <input
              className="filter-input classy-input"
              type="text"
              placeholder="Discovery Methods"
              value={discoveryMethods}
              onChange={(e) => setDiscoveryMethods(e.target.value)}
            />
            <input
              className="filter-input classy-input"
              type="text"
              placeholder="Telescopes"
              value={telescopes}
              onChange={(e) => setTelescopes(e.target.value)}
            />
            <input
              className="filter-input classy-input"
              type="text"
              placeholder="Facilities"
              value={facilities}
              onChange={(e) => setFacilities(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <Loading /> // Replace loading text with your loading component
        ) : (
          <div className="planets-container">
            {currentPlanets.length > 0 ? (
              currentPlanets.map((planet, index) => (
                <PlanetCard
                  key={index}
                  pl_name={planet.pl_name}
                  sy_dist={planet.sy_dist}
                  pl_masse={planet.pl_cmasse}
                  disc_year={planet.disc_year}
                  imageSrc={planet.pl_image}
                />
              ))
            ) : (
              <p className="no-planets-text">No planets found.</p>
            )}
          </div>
        )}

        
      </div>
      {(currentPlanets.length===0 || loading) ? (<></>)
      :
      <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
      }


     
      <div className="blank"></div>
      <Footer />
    </>
  );
};

export default ExploreExoplanets;
