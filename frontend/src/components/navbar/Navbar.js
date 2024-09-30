import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import '../variables.css';
import Logo from '../../assets/logo.png';
import Login from '../login/Login'; // Import the Login component

function Navbar() {
    const [theme, setTheme] = useState('light');
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const location = useLocation();  // Use useLocation to get the current path

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const openLoginPopup = () => setIsLoginPopupOpen(true);
    const closeLoginPopup = () => setIsLoginPopupOpen(false);

    const getLinkClass = (path) => {
        return location.pathname === path ? 'nav-link active' : 'nav-link';
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
            <Link to="/">  
                    <img src={Logo} alt="Logo" className="logo-icon" />
            </Link>
                <div className="logo-text">ExoReach</div>
            </div>
            <div className="navbar-center">
            </div>
            <div className="navbar-right">
            <Link to="/" className={getLinkClass('/')}>Home</Link>
                <Link to="/about" className={getLinkClass('/about')}>Community</Link>
                <Link to="/services" className={getLinkClass('/services')}>Profile</Link>
                {/* <button onClick={toggleTheme} className="theme-toggle-button">
                    {theme === 'light' ? (
                        <MdDarkMode className="theme-icon" />
                    ) : (
                        <MdOutlineLightMode className="theme-icon" />
                    )}
                </button> */}
                <button onClick={openLoginPopup} className="login-button">Login</button>
            </div>
            {isLoginPopupOpen && <Login onClose={closeLoginPopup} />}
        </nav>
    );
}

export default Navbar;
