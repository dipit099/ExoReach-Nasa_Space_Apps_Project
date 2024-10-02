import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExoShowDown.css';
import Navbar from '../../components/navbar/Navbar';
import SERVER_URL from '../../config/SERVER_URL';  // Import SERVER_URL

function ExoShowDown() {
    const [caption, setCaption] = useState('');
    const [description, setDescription] = useState('');
    const [artFile, setArtFile] = useState(null);
    const [liveCompetition, setLiveCompetition] = useState(null); // Fetch from server
    const [competitionJoined, setCompetitionJoined] = useState(false);
    const [pastCompetitions, setPastCompetitions] = useState([]);
    const [upcomingCompetitions, setUpcomingCompetitions] = useState([]);
    const [view, setView] = useState('past');

    useEffect(() => {
        fetchOngoingCompetition();
        fetchPastCompetitions();
        fetchUpcomingCompetitions();
    }, []);

    const fetchOngoingCompetition = async () => {
        try {
            console.log("sending posts");
            const response = await axios.post(`${SERVER_URL}/exoshowdown/ongoing-showdown`, {
               
            });
            console.log('Ongoing competition:', response.data);
        } catch (error) {
            console.error('Error fetching ongoing competition:', error);
        }
    };
    

    const fetchPastCompetitions = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/exoshowdown/past-showdown`);
            //setPastCompetitions(response.data);
            console.log('Past competitions:', response.data);
        } catch (error) {
            console.error('Error fetching past competitions:', error);
        }
    };

    const fetchUpcomingCompetitions = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/exoshowdown/upcoming-showdown`);
            //setUpcomingCompetitions(response.data);
            console.log('Upcoming competitions:', response.data);
        } catch (error) {
            console.error('Error fetching upcoming competitions:', error);
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
            await axios.post(`${SERVER_URL}/api/upload-art`, formData);
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

    const handleViewChange = (newView) => {
        setView(newView);
    };

    return (
        <>
        <Navbar />
        <div className="exoshowdown-container">
            <h1 className="title">ExoShowDown: Art Competition</h1>

            {/* Ongoing competition */}
            {liveCompetition && (
                <div className="ongoing-competition">
                    <h2>{liveCompetition.title}</h2>
                    <h3>{liveCompetition.description}</h3>

                    {!competitionJoined && (
                        <button className="join-button" onClick={handleJoin}>
                            Join Competition
                        </button>
                    )}

                    {competitionJoined && (
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
                    )}
                </div>
            )}

            {/* View toggle options */}
            <div className="competition-toggle">
                <button 
                    className={`toggle-button ${view === 'past' ? 'active' : ''}`} 
                    onClick={() => handleViewChange('past')}
                >
                    Past Competitions
                </button>
                <button 
                    className={`toggle-button ${view === 'upcoming' ? 'active' : ''}`} 
                    onClick={() => handleViewChange('upcoming')}
                >
                    Upcoming Competitions
                </button>
            </div>

            {/* Upcoming competitions */}
            {view === 'upcoming' && (
                <div className="upcoming-competitions">
                    <h2>Upcoming Art Competitions</h2>
                    {upcomingCompetitions.length > 0 ? (
                        upcomingCompetitions.map((competition) => (
                            <div key={competition.id} className="competition">
                                <h3>{competition.title}</h3>
                                <p>{competition.description}</p>
                                <p>Start Date: {competition.startDate}</p>
                            </div>
                        ))
                    ) : (
                        <p>No upcoming competitions available.</p>
                    )}
                </div>
            )}

            {/* Past competitions */}
            {view === 'past' && (
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
            )}
        </div>
        </>
    );
}

export default ExoShowDown;
