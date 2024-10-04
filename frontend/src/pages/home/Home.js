import React, { useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/navbar/Navbar';
import SubNavbar from '../../components/navbar/SubNavbar';
import Footer from '../../components/footer/Footer';
import Planet from '../../components/planet/Planet';
import SERVER_URL from '../../config/SERVER_URL';
import MostClickedExoplanets from '../../components/mostclicked/MostClicked';
import HomeExoCards from '../../components/home_elements/homeexocards/HomeExoCards';
import HomeQuiz from '../../components/home_elements/homequiz/HomeQuiz';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.css';


function Home() {
  useEffect(() => {
    const fetchDidYouKnow = async () => {
      try {
        const response = await axios.post(`${SERVER_URL}/did-you-know`);
        if (response.data && response.data.fact) {
          console.log('💡 ' + response.data.fact.planet_name + ': ' + response.data.fact.fact);
          // Display the custom toast notification
          const renderToast = () => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* <p style={{fontSize: '2.2em'}}>💡</p> */}
              <div style={{ paddingLeft: '10px', paddingTop: '10px', paddingBottom: '10px' }}>
                <strong style={{ fontSize: '1.4em', color: '#ffbe58' }}>
                  <i className="fas fa-lightbulb" style={{ fontSize: '1.3em', color: '#ffbe58', paddingRight: '10px', transform: 'rotate(-15deg)' }}></i>
                  Did you know?
                </strong>
                <p style={{ fontSize: '0.8em', marginTop: '10px', color: '##e0f3ff' }}>
                  {response.data.fact.planet_name + ': ' + response.data.fact.fact}
                </p>
              </div>
            </div>
          );

          toast(renderToast(), {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Bounce,

          });

          /* toast.info(response.data.fact.planet_name + ': ' + response.data.fact.fact) */
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
