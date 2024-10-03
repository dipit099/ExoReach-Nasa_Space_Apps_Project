import React, { useEffect, useRef, useState } from "react";
import "./HomeExoCards.css";
import { Link } from "react-router-dom";
import LargeButton from "../largebutton/LargeButton";
import planet1 from "../../../assets/planet1.png";
import planet2 from "../../../assets/planet2.png";
import planet3 from "../../../assets/planet3.png";

const HomeExoCards = () => {
  const cardRefs = [useRef(null), useRef(null), useRef(null)];
  const [isInView, setIsInView] = useState([false, false, false]);

  useEffect(() => {
    const handleScroll = () => {
      const cardVisibility = cardRefs.map((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          return rect.top >= 0 && rect.bottom <= window.innerHeight;
        }
        return false;
      });
      setIsInView(cardVisibility);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="anton-regular-homexo">EXOFLEX</div>
      <br />
      <br />
      <div className="exocards-section">
        <div className="exocards-section-left">
          <div className="main">
            <img
              ref={cardRefs[0]}
              className={`card ${isInView[0] ? "card-ani-1" : ""}`}
              id="c1"
              src={planet3}
              alt="Image 1"
            />
            <img
              ref={cardRefs[1]}
              className={`card ${isInView[1] ? "card-ani-2" : ""}`}
              id="c2"
              src={planet2}
              alt="Image 2"
            />
            <img
              ref={cardRefs[2]}
              className={`card ${isInView[2] ? "card-ani-3" : ""}`}
              id="c3"
              src={planet1}
              alt="Image 3"
            />
          </div>
        </div>

        <div className="exocards-section-right">
          Explore key facts about exoplanets and add them to your collection. Get ready for <Link to='/exoflex' className="link-exoshowdown"> <span className="highlight-text">ExoFlex</span></Link>, where you can select cards and dive into thrilling solo challenges, putting your knowledge and strategy to the test!
          <br />
          <br />
          <br />
          <br />
          <div className="button-wrap-homexo">
            <LargeButton text="PLAY NOW" link="/exocards" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeExoCards;
