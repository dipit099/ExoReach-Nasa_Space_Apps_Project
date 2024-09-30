import React, { useEffect, useRef, useState } from "react";
import "./HomeQuiz.css";
import { Link } from "react-router-dom";
import LargeButton from "../largebutton/LargeButton";
import Quiz from "../../assets/Quiz.png";

const HomeQuiz = () => {
  const imageRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <div className="anton-regular-homexo">EXOQUIZ</div>
      <div className="exocards-section">
        <Link to="/exocards"></Link>
        <div className="exocards-section-left">
          <img
            ref={imageRef}
            src={Quiz}
            alt="Quiz"
            className={isInView ? "img-ani" : ""}
          />
        </div>

        <div className="exocards-section-right">
          Think you’re an exoplanet expert? Dive into our quiz to test your
          knowledge and discover how much you really know about these
          fascinating worlds!
          <br />
          <br />
          <br />
          <br />
          <div className="button-wrap-homexo">
            <LargeButton text="TAKE QUIZ" link="/exoquiz" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeQuiz;
