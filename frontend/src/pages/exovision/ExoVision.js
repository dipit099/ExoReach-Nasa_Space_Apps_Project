import React from 'react';
import './ExoVision.css';  // Import your custom CSS file for styling
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

function ExoVision() {
    return ( 
        <>
        <Navbar />
        <div className="exovision-container">
            <h1 className="exovision-title">🌍 Explore Exoplanets 🌌</h1>
            <div className="exovision-buttons">
                <button className="explore-btn" onClick={() => alert('Ready to Explore! 🚀')}>
                    Start Your Journey 🚀
                </button>
                <button className="learn-btn" onClick={() => alert('Let\'s Learn More About Exoplanets 📚')}>    {/* add did u know section  */}
                    Learn More 📚
                </button>
            </div>
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
            <p className="exovision-description">
                Discover the wonders of distant worlds through interactive 3D models! Use the controls to zoom in, rotate, and explore exoplanets in detail.
            </p>

            
        </div>
        <div className="blank"></div>
        <Footer/>
        </>
    );
}

export default ExoVision;
