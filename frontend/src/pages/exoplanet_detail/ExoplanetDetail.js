import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SERVER_URL from "../../config/SERVER_URL";
import Navbar from "../../components/navbar/Navbar";
import "./ExoplanetDetail.css";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";

const ExoplanetDetail = () => {
  const { pl_name } = useParams();

  const [exoplanet, setExoplanet] = useState(null);
  const [showMore, setShowMore] = useState(false); // State to control the visibility of additional list items

  const formattedPlName = pl_name.replace(/_/g, " ");
  

  console.log(pl_name);

  useEffect(() => {
    const fetchExoplanetDetail = async () => {
      try {
        const response = await axios.post(
          `${SERVER_URL}/exoplanet/details/${formattedPlName}`
        );
        console.log(response.data);
        if (response.data.success) {
          setExoplanet(response.data.planet); // Set the exoplanet data
          await incrementPlanetViews(response.data.planet.pl_name);
        }
      } catch (error) {
        console.error("Error fetching exoplanet details:", error);
      }
    };
    fetchExoplanetDetail();
  }, [formattedPlName]); // Add formattedPlName to the dependency array

  // Toggle function for Show More / Show Less
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const incrementPlanetViews = async (planetName) => {
    try {
      const response = await axios.post(`${SERVER_URL}/exoplanet/view_increment`, {
        planetName
      });
      if (response.data.success) {
        console.log(response.data.message); // Success message from the server
      }
    } catch (error) {
      console.error("Error incrementing planet views:", error);
    }
  };

  // Render the details only if exoplanet data is available
  return (
    <div>
      {exoplanet ? (
        <div className="bg-all">
          <Navbar />
          <div className="exoplanet-name">{exoplanet.pl_name}</div>
          <div className="iframe-div">
            <iframe
              src={`https://eyes.nasa.gov/apps/exo/#/planet/${pl_name}`}
              width="100%"
              height="600px"
              frameBorder="0"
            ></iframe>
          </div>

          <div className="details-container">
            <h2>Planet Details</h2>
            <ul>
              <li>
                <strong>Planet Letter:</strong> {exoplanet.pl_letter}
              </li>
              <li>
                <strong>Host Star:</strong> {exoplanet.hostname}
              </li>
              <li>
                <strong>Discovery Publication Date:</strong>{" "}
                {exoplanet.disc_pubdate}
              </li>
              <li>
                <strong>Discovery Year:</strong> {exoplanet.disc_year}
              </li>
              <li>
                <strong>Discovery Method:</strong> {exoplanet.discoverymethod}
              </li>
              <li>
                <strong>Discovery Locale:</strong> {exoplanet.disc_locale}
              </li>
              <li>
                <strong>Discovery Facility:</strong> {exoplanet.disc_facility}
              </li>
              <li>
                <strong>Discovery Instrument:</strong>{" "}
                {exoplanet.disc_instrument}
              </li>
              <li>
                <strong>Discovery Telescope:</strong> {exoplanet.disc_telescope}
              </li>
              <li>
                <strong>Galactic Longitude:</strong> {exoplanet.glon}
              </li>

              {/* Conditionally render more list items if showMore is true */}
              {showMore && (
                <>
                  <li>
                    <strong>Galactic Latitude:</strong> {exoplanet.glat}
                  </li>
                  <li>
                    <strong>Ecliptic Longitude:</strong> {exoplanet.elon}
                  </li>
                  <li>
                    <strong>Ecliptic Latitude:</strong> {exoplanet.elat}
                  </li>
                  <li>
                    <strong>Orbital Period (days):</strong>{" "}
                    {exoplanet.pl_orbper}
                  </li>
                  <li>
                    <strong>Semi-Major Axis (AU):</strong>{" "}
                    {exoplanet.pl_orbsmax}
                  </li>
                  <li>
                    <strong>Orbital Inclination (degrees):</strong>{" "}
                    {exoplanet.pl_orbincl}
                  </li>
                  <li>
                    <strong>Orbital Eccentricity:</strong>{" "}
                    {exoplanet.pl_orbeccen}
                  </li>
                  <li>
                    <strong>Equilibrium Temperature (K):</strong>{" "}
                    {exoplanet.pl_eqt}
                  </li>
                  <li>
                    <strong>Density (g/cm³):</strong> {exoplanet.pl_dens}
                  </li>
                  <li>
                    <strong>Distance from Earth (parsecs):</strong>{" "}
                    {exoplanet.sy_dist}
                  </li>
                  <li>
                    <strong>Galactic X-Coordinate:</strong> {exoplanet.x}
                  </li>
                  <li>
                    <strong>Galactic Y-Coordinate:</strong> {exoplanet.y}
                  </li>
                  <li>
                    <strong>Galactic Z-Coordinate:</strong> {exoplanet.z}
                  </li>
                  <li>
                    <strong>Radial Velocity Amplitude</strong>{" "}
                    {exoplanet.pl_rvamp}
                  </li>
                  <li>
                    <strong>Radius (Jupiter Radii)</strong> {exoplanet.pl_radj}
                  </li>
                  <li>
                    <strong>Radius (Earth Radii)</strong> {exoplanet.pl_rade}
                  </li>
                  <li>
                    <strong>Radius Ratio (Planet to Star)</strong>{" "}
                    {exoplanet.pl_ratror}
                  </li>
                  <li>
                    <strong>Distance Ratio (Planet to Star)</strong>{" "}
                    {exoplanet.pl_ratdor}
                  </li>
                  <li>
                    <strong>Last Row Update</strong>{" "}
                    {new Date(exoplanet.rowupdate).toLocaleString()}
                  </li>
                  <li>
                    <strong>Publication Date for Planet Data</strong>{" "}
                    {exoplanet.pl_pubdate}
                  </li>
                  <li>
                    <strong>Important Parameters</strong> {exoplanet.pl_imppar}
                  </li>
                  <li>
                    <strong>Mass (Jupiter Masses)</strong> {exoplanet.pl_massj}
                  </li>
                  <li>
                    <strong>Mass (Earth Masses)</strong> {exoplanet.pl_masse}
                  </li>
                  <li>
                    <strong>Mass (Jupiter Masses - additional)</strong>{" "}
                    {exoplanet.pl_bmassj}
                  </li>
                  <li>
                    <strong>Mass (Earth Masses - additional)</strong>{" "}
                    {exoplanet.pl_bmasse}
                  </li>
                  <li>
                    <strong>Mass Data Provider</strong> {exoplanet.pl_bmassprov}
                  </li>
                  <li>
                    <strong>Minimum Mass (Jupiter Masses - inclination)</strong>{" "}
                    {exoplanet.pl_msinij}
                  </li>
                  <li>
                    <strong>Minimum Mass (Earth Masses - inclination)</strong>{" "}
                    {exoplanet.pl_msinie}
                  </li>
                  <li>
                    <strong>Effective Temperature of the Star (K)</strong>{" "}
                    {exoplanet.st_teff}
                  </li>
                  <li>
                    <strong>Radial Velocity of the Star</strong>{" "}
                    {exoplanet.st_radv}
                  </li>
                  <li>
                    <strong>Rotational Velocity of the Star</strong>{" "}
                    {exoplanet.st_vsin}
                  </li>
                  <li>
                    <strong>Luminosity of the Star</strong> {exoplanet.st_lum}
                  </li>
                  <li>
                    <strong>Age of the Star</strong> {exoplanet.st_age}
                  </li>
                  <li>
                    <strong>Mass of the Star (Solar Masses)</strong>{" "}
                    {exoplanet.st_mass}
                  </li>
                  <li>
                    <strong>Density of the Star (g/cm³)</strong>{" "}
                    {exoplanet.st_dens}
                  </li>
                  <li>
                    <strong>Radius of the Star (Solar Radii)</strong>{" "}
                    {exoplanet.st_rad}
                  </li>
                  <li>
                    <strong>Stellar Type</strong> {exoplanet.soltype}
                  </li>
                  <li>
                    <strong>Number of Stars in System</strong>{" "}
                    {exoplanet.sy_snum}
                  </li>
                  <li>
                    <strong>Number of Planets in System</strong>{" "}
                    {exoplanet.sy_pnum}
                  </li>
                  <li>
                    <strong>Number of Moons in System</strong>{" "}
                    {exoplanet.sy_mnum}
                  </li>
                  <li>
                    <strong>Number of Photometric Observations</strong>{" "}
                    {exoplanet.st_nphot}
                  </li>
                  <li>
                    <strong>Number of Radial Velocity Measurements</strong>{" "}
                    {exoplanet.st_nrvc}
                  </li>
                  <li>
                    <strong>Number of Spectroscopic Observations</strong>{" "}
                    {exoplanet.st_nspec}
                  </li>
                  <li>
                    <strong>
                      Number of Exoplanetary Spectroscopy Observations
                    </strong>{" "}
                    {exoplanet.pl_nespec}
                  </li>
                  <li>
                    <strong>Number of Transit Spectroscopy Observations</strong>{" "}
                    {exoplanet.pl_ntranspec}
                  </li>
                  <li>
                    <strong>
                      Number of Direct Imaging Spectroscopy Observations
                    </strong>{" "}
                    {exoplanet.pl_ndispec}
                  </li>
                </>
              )}
            </ul>

            {/* Show More / Show Less button */}
            <button onClick={toggleShowMore} className="toggle-button">
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>

          <div className="blank"></div>
          <Footer />
        </div>
      ) : (
        <Loading /> /* You can replace this with your loading component */
      )}
    </div>
  );
};

export default ExoplanetDetail;
