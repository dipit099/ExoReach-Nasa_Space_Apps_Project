import React from 'react';
import './HomeReview.css';
import humanPicture1 from '../../assets/human1.jpg';  // Ensure you have images at these paths
import humanPicture2 from '../../assets/human2.jpg';

function HomeReview() {
  return (
    <div className='home-review'>
      <div className='title-font review'>What Our Users Say</div>
      <div className='review-container'>
        <div className='review-card'>
          <img src={humanPicture1} alt="Reviewer 1" className="review-image" />
          <div className='review-content'>
            <div className='review-text'>
              <p>"CareConnect has truly transformed the way I manage my health. The integrated services are top-notch, and the support is exceptional. Highly recommend!"</p>
            </div>
            <div className='review-author'>
              <p>- John Doe</p>
            </div>
            <div className='review-rating'>
              <span>Rating:</span>
              <div className='stars'>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">☆</span>
              </div>
            </div>
          </div>
        </div>
        <div className='review-card'>
          <img src={humanPicture2} alt="Reviewer 2" className="review-image" />
          <div className='review-content'>
            <div className='review-text'>
              <p>"The comprehensive approach of CareConnect has been a game-changer for me. Excellent services and very user-friendly platform!"</p>
            </div>
            <div className='review-author'>
              <p>- Jane Smith</p>
            </div>
            <div className='review-rating'>
              <span>Rating:</span>
              <div className='stars'>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeReview;
