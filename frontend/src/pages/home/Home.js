import React from 'react';
import './Home.css';
import Navbar from '../../components/navbar/Navbar';
import SubNavbar from '../../components/subnavbar/Subnavbar';
import CountUp from 'react-countup';
import gif from '../../assets/eHospital.gif';
import Planet from '../../components/planet/Planet';
const items = ['Explore Exoplanets', 'ExoCards', 'ExoShowdown', 'ExoQuiz'];

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
        <div className='home-stats'>
          <div className='stat-box'>
            <h2><CountUp end={500} duration={3} />+</h2>
            <h3>Doctors</h3>
            <p>Our network boasts over 500 experienced and highly qualified doctors, committed to providing the best healthcare services.</p>
          </div>
          <div className='stat-box'>
            <h2><CountUp end={3000} duration={3} />+</h2>
            <h3>Patients Served</h3>
            <p>We have successfully served over 3,000 patients, ensuring they receive the care and attention they deserve.</p>
          </div>
          <div className='stat-box'>
            <h2><CountUp end={50} duration={3} />+</h2>
            <h3>Specialties</h3>
            <p>Our healthcare services cover more than 50 specialties, providing comprehensive care across various fields of medicine.</p>
          </div>
        </div>

      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
