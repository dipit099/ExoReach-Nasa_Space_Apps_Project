import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER_URL from '../../config/SERVER_URL';

function ExoCardCollection({ userId }) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // const fetchExoCardCollection = async () => {
        //     try {
        //         const response = await axios.post(`${SERVER_URL}/profile/exocard-collection`, { userId });
        //         setCards(response.data);
        //     } catch (error) {
        //         console.error('Error fetching ExoCard collection', error);
        //     }
        // };
        // fetchExoCardCollection();
    }, [userId]);

    if (!cards.length) return <p>No ExoCards available</p>;

    return (
        <div className="exocard-collection">
            <h3>ExoCard Collection</h3>
            {/* {cards.map((card) => (
                <div key={card.id} className="exocard-item">
                    <img src={card.cardImage} alt="ExoCard" />
                    <p>{card.name}</p>
                </div>
            ))} */}
        </div>
    );
}

export default ExoCardCollection;
