import React from 'react';
import './Home.css';
import Navbar from '../../components/navbar/Navbar';
import SubNavbar from '../../components/subnavbar/Subnavbar';
import CountUp from 'react-countup';
import Footer from '../../components/footer/Footer';
import Planet from '../../components/planet/Planet';
import MostClickedExoplanets from '../../components/mostclicked/MostClicked';
const items = ['Overview','Explore Exoplanets', 'ExoCards', 'ExoShowdown', 'ExoQuiz'];

function Home() {
  return (
    <div>
      <Navbar />
      <SubNavbar items={items}/>
      <Planet/>
      <div className="home-container">
        <div className="title-section">
          <div className="home-right">
          </div>
        </div>
        <MostClickedExoplanets/>      </div>
       <Footer /> 
    </div>
  );
}

export default Home;
