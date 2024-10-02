import React from 'react';
import { useParams } from 'react-router-dom';
import './ExoplanetDetail.css'; // Optional styling

const ExoplanetDetail = () => {
  const { pl_name } = useParams(); // Extract pl_name from the URL

  return (
    <div className="exoplanet-detail">
      <iframe
        src={`https://eyes.nasa.gov/apps/exo/#/planet/${pl_name}`} 
        width="100%"
        height="600px"
        frameBorder="0"
        title="Exoplanet Visualization"
        className="exovision-iframe"
      ></iframe>
    </div>
  );
};

export default ExoplanetDetail;
