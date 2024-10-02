import React, { useState, useEffect } from 'react';
import './MostClicked.css'; 
import PlanetCard from '../planetcard/PlanetCard'; 
import LargeButton from '../home_elements/largebutton/LargeButton';
// TODO: data from backend

const imgsrc = 'https://images.unsplash.com/photo-1708257106455-3bffdd9aae64?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const exoplanetData = [
  { name: 'Kepler-22b', sy_dist: 620, pl_masse: 2.4, disc_year: 2011, clicks: 120, img: imgsrc },
  { name: 'Proxima Centauri b', sy_dist: 4.2, pl_masse: 1.27, disc_year: 2016, clicks: 95, img: imgsrc },
  { name: 'Kepler-22b', sy_dist: 620, pl_masse: 2.4, disc_year: 2011, clicks: 120, img: imgsrc },
  { name: 'Kepler-22b', sy_dist: 620, pl_masse: 2.4, disc_year: 2011, clicks: 120, img: imgsrc },
  { name: 'Kepler-22b', sy_dist: 620, pl_masse: 2.4, disc_year: 2011, clicks: 120, img: imgsrc }
];


const MostClickedExoplanets = () => {
  const [mostClicked, setMostClicked] = useState([]);

  useEffect(() => {
    const sortedExoplanets = exoplanetData.sort((a, b) => b.clicks - a.clicks);
    setMostClicked(sortedExoplanets);
  }, []);

  return (
    <div className="most-clicked-section">
      <br />
      <br />
      <div className='anton-regular-most'>MOST CLICKED EXOPLANETS</div>
      <div className="most-clicked-list">
        {mostClicked.map((planet, index) => (
          <PlanetCard 
          key={index} 
          pl_name={planet.name} 
          sy_dist={planet.sy_dist} 
          pl_masse={planet.pl_masse} 
          disc_year={planet.disc_year}
          imageSrc={planet.img}
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
