import React, { useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/navbar/Navbar';
import SubNavbar from '../../components/navbar/SubNavbar';
import Footer from '../../components/footer/Footer';
import Planet from '../../components/planet/Planet';
import MostClickedExoplanets from '../../components/mostclicked/MostClicked';
import HomeExoCards from '../../components/home_elements/homeexocards/HomeExoCards';
import HomeQuiz from '../../components/home_elements/homequiz/HomeQuiz';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure(); // Initialize toastify

function Home() {
  useEffect(() => {
    const fetchDidYouKnow = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/didyouknow`);
        if (response.data && response.data.fact) {
          // Display the custom toast notification
          toast.info(
            <div>
              <strong style={{ fontSize: '1.5em' }}>Did you know?</strong>
              <p style={{ fontSize: '1em', marginTop: '5px' }}>{response.data.fact}</p>
            </div>,
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 5000, // Auto close after 5 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        }
      } catch (error) {
        console.error('Error fetching did you know fact:', error);
      }
    };

    fetchDidYouKnow();
  }, []); // This will trigger the API call and show the pop-up on page load.

  return (
    <div>
      <Navbar />
      <SubNavbar />
      <Planet />
      <div className="home-container">
        <div className="title-section">
          <div className="home-right"></div>
        </div>
        <MostClickedExoplanets />
        <HomeExoCards />
        <HomeQuiz />
        <div className="blank"></div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
