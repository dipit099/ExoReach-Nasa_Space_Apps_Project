import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER_URL from '../../config/SERVER_URL';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ArtInfo({ userId }) {
    const [art, setArt] = useState([]);

    useEffect(() => {
        const fetchArtInfo = async () => {
            try {
                const response = await axios.post(`${SERVER_URL}/profile/art-info`, { userId });
                console.log("art-info",response.data);
                toast.success('Art info fetched successfully');
               // setArt(response.data);
            } catch (error) {
                console.error('Error fetching art info', error);
            }
        };
        fetchArtInfo();
    }, [userId]);

    if (!art.length) return <p>No art info available</p>;

    return (
        <div className="art-info">
            <h3>Art Info</h3>
            {art.map((item) => (
                <div key={item.id} className="art-item">
                    <img src={item.artImage} alt="Art" />
                    <p>{item.title}</p>
                </div>
            ))}
        </div>
    );
}

export default ArtInfo;
