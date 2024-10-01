import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExoShowDown.css';
import Navbar from '../../components/navbar/Navbar';

function ExoShowDown() {
    const [caption, setCaption] = useState('');
    const [description, setDescription] = useState(''); 
    const [artFile, setArtFile] = useState(null);
    const [liveCompetition, setLiveCompetition] = useState(true);
    const [competitionJoined, setCompetitionJoined] = useState(false);
    const [pastCompetitions, setPastCompetitions] = useState([]);
    const [remainingTime, setRemainingTime] = useState(''); 

    useEffect(() => {
        fetchPastCompetitions();
        fetchRemainingTime();
    }, []);

    // Fetch past competitions
    const fetchPastCompetitions = async () => {
        try {
            const response = await axios.get('/api/past-competitions');
            setPastCompetitions(response.data);
        } catch (error) {
            console.error('Error fetching past competitions:', error);
        }
    };

    // Fetch remaining time from the server
    const fetchRemainingTime = async () => {
        try {
            const response = await axios.get('/api/remaining-time'); // Assuming you have this API endpoint
            setRemainingTime(response.data.remainingTime); // Use the server response to set remaining time
        } catch (error) {
            console.error('Error fetching remaining time:', error);
        }
    };

    const handleFileChange = (e) => {
        setArtFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('description', description);
        formData.append('artFile', artFile);

        try {
            await axios.post('/api/upload-art', formData);
            alert('Art uploaded successfully!');
            setCaption('');
            setDescription(''); 
            setArtFile(null);
        } catch (error) {
            console.error('Error uploading art:', error);
        }
    };

    const handleJoin = () => {
        setCompetitionJoined(true);
    };

    return (
        <>
        <Navbar />
        <div className="exoshowdown-container">
            <h1 className="title">ExoShowDown: Art Competition</h1>

            {liveCompetition && (
                <div className="remaining-time">
                    <h2>Remaining Time: {remainingTime}</h2>
                </div>
            )}

            {!competitionJoined && (
                <button className="join-button" onClick={handleJoin}>
                    Join Competition
                </button>
            )}

            {competitionJoined && liveCompetition && (
                <div className="ongoing-competition">
                    <h2>Submit Your Art</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Enter caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <input type="file" onChange={handleFileChange} accept="image/*" required />
                        <button type="submit" className="submit-button">Submit Art</button>
                    </form>
                </div>
            )}

            <div className="past-competitions">
                <h2>Gallery of Champions</h2>
                {pastCompetitions.length > 0 ? (
                    pastCompetitions.map((competition) => (
                        <div key={competition.id} className="competition">
                            <h3>{competition.title}</h3>
                            <div className="art-gallery">
                                {competition.winners.map((winner, index) => (
                                    <div key={index} className="winner-card">
                                        <img src={winner.artUrl} alt={`Art by ${winner.name}`} />
                                        <h4>{winner.name}</h4>
                                        <p>{winner.title}</p>
                                        <span className={`badge ${winner.type.toLowerCase()}`}>{winner.type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No past competitions available.</p>
                )}
            </div>
        </div>
        </>
    );
}

export default ExoShowDown;
