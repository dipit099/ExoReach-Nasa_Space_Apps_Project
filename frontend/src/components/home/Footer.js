import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-left">
                <div className='footer-title'>About CareConnect</div>
                <div className='footer-description'> CareConnect is dedicated to providing top-notch healthcare services and
                    connecting patients with the best medical professionals.
                    We aim to make healthcare accessible and efficient for everyone.</div>
                <div className='footer-description'>&copy; 2024 CareConnect. All rights reserved.</div>
            </div>
            <div className="footer-right">
                <div className='footer-title'>Features</div>
                <div>
                    <ul className="footer-nav">
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
