import React, { useState, useEffect } from 'react';
import './MostClicked.css'; 
import MostClickedCard from './MostClickedCard/MostClickedCards'; 
import LargeButton from '../largebutton/LargeButton';
// TODO: data from backend

const imgsrc = 'https://images.unsplash.com/photo-1708257106455-3bffdd9aae64?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
const exoplanetData = [
  { name: 'Kepler-22b', clicks: 120 , img: imgsrc },
  { name: 'Proxima Centauri b', clicks: 95 ,img: imgsrc},
  { name: 'TRAPPIST-1d', clicks: 150 ,img: imgsrc},
  { name: 'Gliese 581g', clicks: 80 ,img: imgsrc},
];

const MostClickedExoplanets = () => {
  const [mostClicked, setMostClicked] = useState([]);

  useEffect(() => {
    const sortedExoplanets = exoplanetData.sort((a, b) => b.clicks - a.clicks);
    setMostClicked(sortedExoplanets);
  }, []);

  return (
    <div className="most-clicked-section">
      <div className='anton-regular-most'>Most Clicked Exoplanets</div>
      <div className="most-clicked-list">
        {mostClicked.map((planet, index) => (
          <MostClickedCard name={planet.name} imageSrc={planet.img} />
        ))}
      </div>
      <div className="button-wrap">
      <LargeButton text='LEARN MORE' link='/exploreexoplanets'/>
      </div>
    </div>
  );
};

export default MostClickedExoplanets;
