import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Subnavbar.css';

const SubNavbar = ({ items }) => {
  const location = useLocation();

  return (
    <div className="subnavbar">
      {items.map((item, index) => {
        // If the item is "Explore Exoplanets", set the path to "/"
        const path = item.toLowerCase() === "explore exoplanets" 
          ? '/' 
          : `/${item.toLowerCase().replace(/\s+/g, '')}`; 
        
        const isActive = location.pathname === path; 

        return (
          <Link key={index} to={path} className={`subnavbar-item ${isActive ? 'active' : ''}`}>
            {item}
          </Link>
        );
      })}
    </div>
  );
};

export default SubNavbar;
