import React from "react";
import "./ExoVision.css"; // Import your custom CSS file for styling
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

function ExoVision() {
  return (
    <>
      <Navbar />
      <div className="exovision-container">
      <div className="explore-title">ExoVision</div>
        <br />
        <br />
        <p className="exovision-description">
          Step into the universe with ExoVision! Experience the beauty of
          distant exoplanets like never before. Engage with stunning interactive
          3D models that allow you to zoom, rotate, and delve into the
          intricacies of these celestial bodies. Discover their unique features
          and uncover the mysteries of the cosmos—all at your fingertips!
        </p>
        <br />
        <br />
        <div className="exovision-iframe-container">
          <iframe
            src="https://eyes.nasa.gov/apps/exo/"
            width="100%"
            height="600px"
            frameBorder="0"
            title="Exoplanet Visualization"
            className="exovision-iframe"
          ></iframe>
        </div>
        <br />
      </div>
      <div className="blank"></div>
      <Footer />
    </>
  );
}

export default ExoVision;
