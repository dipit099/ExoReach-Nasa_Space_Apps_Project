import React, { useState, useEffect } from 'react';
import './MostClicked.css'; 
import PlanetCard from '../planetcard/PlanetCard'; 
import LargeButton from '../home_elements/largebutton/LargeButton';
import axios from 'axios'; // Import axios
import SERVER_URL from '../../config/SERVER_URL';

const MostClickedExoplanets = () => {
  const [mostClicked, setMostClicked] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchMostClickedExoplanets = async () => {
      try {
        const response = await axios.post(`${SERVER_URL}/home/most_viewed`); // Make the GET request
        if (response.data.success) {
          setMostClicked(response.data.data); // Set the data from the response
        } else {
          setError('Failed to fetch exoplanet data');
        }
      } catch (err) {
        console.error('Error fetching most clicked exoplanets:', err);
        setError('An error occurred while fetching data');
      }
    };

    fetchMostClickedExoplanets();
  }, []);

  if (error) {
    return <div>{error}</div>; // Display an error message if something goes wrong
  }

  return (
    <div className="most-clicked-section">
      <br />
      <br />
      <div className='anton-regular-most'>MOST CLICKED EXOPLANETS</div>
      <div className="most-clicked-list">
        {mostClicked.map((planet, index) => (
          <PlanetCard 
            key={index} 
            pl_name={planet.pl_name} // Use the fetched pl_name
            sy_dist={planet.sy_dist || 'Unknown'} // Optional: Handle missing data
            pl_masse={planet.pl_masse || 'Unknown'} 
            disc_year={planet.disc_year || 'Unknown'} 
            imageSrc={planet.pl_image || 'default_image_url'} // Use the image from the backend or a default
          />
        ))}
      </div>
      <div className="button-wrap">
        <LargeButton text='LEARN MORE' link='/exploreexoplanets'/>
      </div>
    </div>
  );
};

export default MostClickedExoplanets;
