import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import { FaArrowRight } from 'react-icons/fa'; // Import the arrow icon from react-icons
import './LargeButton.css'; // Import the CSS file for styles

const LargeButton = ({ text, link }) => {
  return (
    <div className="button-flex">
         <Link to={link} className="large-button">
      {text}&nbsp;&nbsp;&nbsp;
      <FaArrowRight className="arrow-icon" /> {/* Add the arrow icon */}
    </Link>
    </div>
   
  );
};

export default LargeButton;
