import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import '../variables.css';
import Logo from '../../assets/logo.png';

import Login from '../login/Login'; // Import the Login component
import Register from '../login/Register'; // Import the CreateAccount component
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { AuthContext } from '../../config/AuthContext'; // Import the AuthContext
import { toast } from 'react-toastify';

function Navbar() {
    const { isLoggedIn, logout } = useContext(AuthContext); // Use AuthContext
    const [theme, setTheme] = useState('dark');  // Set default theme to 'dark'
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [isCreateAccountPopupOpen, setIsCreateAccountPopupOpen] = useState(false);
    const location = useLocation();  // Use useLocation to get the current path
    const [user_id, setUser_id] = useState(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        const id = localStorage.getItem('user_id');
        setUser_id(id);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const openLoginPopup = () => setIsLoginPopupOpen(true);
    const closeLoginPopup = () => setIsLoginPopupOpen(false);

    const openCreateAccountPopup = () => setIsCreateAccountPopupOpen(true);
    const closeCreateAccountPopup = () => setIsCreateAccountPopupOpen(false);

    const getLinkClass = (path) => {
        return location.pathname === path ? 'nav-link active' : 'nav-link';
    };

    const handleLogout = () => {
        toast.success('Logged out successfully'); // Show success message        
        logout(); // Call logout from AuthContext
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
                <Link to={`/exovision`} className={getLinkClass('/exovision')} id='jumping-link'>ExoVision</Link>
                <Link to="/community" className={getLinkClass('/community')}>Community</Link>
                <Link to={`/profile/${user_id}`} className={getLinkClass(`/profile/${user_id}`)}>Profile</Link>
                {/* Theme toggle button if needed */}
                {/* <button onClick={toggleTheme} className="theme-toggle-button">
                    {theme === 'light' ? (
                        <MdDarkMode className="theme-icon" />
                    ) : (
                        <MdOutlineLightMode className="theme-icon" />
                    )}
                </button> */}
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="login-button1">Log out</button> // Change to Logout
                ) : (
                    <button onClick={openLoginPopup} className="login-button1">Log in</button> // Login button
                )}
            </div>
            {isLoginPopupOpen && <Login onClose={closeLoginPopup} createAccountPopupOpen={openCreateAccountPopup} />}
            {isCreateAccountPopupOpen && <Register onClose={closeCreateAccountPopup} loginPopupOpen={openLoginPopup} />}
        </nav>
    );
}

export default Navbar;
