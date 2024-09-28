import React from 'react';
import './Home.css';
import Navbar from '../navbar/Navbar';
import Footer from './Footer';

import CountUp from 'react-countup';
import gif from '../../assets/eHospital.gif';
import HomeReview from './HomeReview'; // Import the HomeReview component

function Home() {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="title-section">
          <div className="home-left">
            <div className="title-box">
              <div className='title-font home'>CareConnect</div>
              <div className='title-font home'>Integrated Healthcare Network</div>
              <div className='description home'>
                Experience seamless care with CareConnect, where your health is our priority. Join our integrated network today.
              </div>
              <button>Join Us Now</button>
            </div>
          </div>
          <div className="home-right">
            <img src={gif} alt="Healthcare GIF" className="background-gif" />
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

        <HomeReview /> {/* Use the HomeReview component */}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
