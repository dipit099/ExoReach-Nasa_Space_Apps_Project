import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css'; // Optional: Import a CSS file for styling
import Logo from '../../assets/logo.png'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <img src={Logo} className="logo" />
        <div className="yellow">
        Team Buet Astroscape
        </div>
        <div className="normal-text">
        Journey Beyond: Explore, Learn, Discover
        Dedicated to unveiling the mysteries of exoplanets, we aim to inspire curiosity and ignite a passion for space exploration in every learner.
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-left">
        <div className="social-media">
        <div className="yellow">Follow Us</div>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#e0f3ff' }}>
              <FaFacebook size={45} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#e0f3ff' }}>
              <FaTwitter size={45} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#e0f3ff' }}>
              <FaInstagram size={45} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: '#e0f3ff' }}>
              <FaYoutube size={45} />
            </a>
          </div>
        </div>
        <div className="footer-bottom-right">
        <div className="footer-links">
            <div className="footer-link-pair">
              <Link to="/">Home</Link>
              <Link to="/explore">Explore Exoplanets</Link>
            </div>
            <div className="footer-link-pair">
              <Link to="/community">Community</Link>
              <Link to="/exocards">ExoCards</Link>
            </div>
            <div className="footer-link-pair">
              <Link to="/profile">Profile</Link>
              <Link to="/exoshowdown">ExoShowdown</Link>
            </div>
            <div className="footer-link-pair">
              <Link to="/aboutus">About Us</Link>
              <Link to="/exoquiz">ExoQuiz</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
