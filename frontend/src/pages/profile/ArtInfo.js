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
                toast.success('Art info fetched successfully');
                // setArt(response.data);
            } catch (error) {
                console.error('Error fetching art info', error);
            }
        };
        fetchArtInfo();
    }, [userId]);

    if (!art.length) return <p className="no-art-message">No art info available</p>;

    return (
        <div className="art-info-section">
            <h3 className="section-title">Art Info</h3>
            <div className="art-items-grid">
                {art.map((item) => (
                    <div key={item.id} className="art-item-card">
                        <img src={item.artImage} alt="Art" className="art-image" />
                        <p className="art-title">{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArtInfo;
