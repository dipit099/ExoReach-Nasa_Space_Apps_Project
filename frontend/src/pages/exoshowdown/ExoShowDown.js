import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExoShowDown.css';
import Navbar from '../../components/navbar/Navbar';
import SERVER_URL from '../../config/SERVER_URL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ExoShowDown() {
    const [caption, setCaption] = useState('');
    const [description, setDescription] = useState('');
    const [artFile, setArtFile] = useState(null);
    const [liveCompetitions, setLiveCompetitions] = useState([]);
    const [competitionJoined, setCompetitionJoined] = useState(false);
    const [pastCompetitions, setPastCompetitions] = useState([]);
    const [upcomingCompetitions, setUpcomingCompetitions] = useState([]);
    const [view, setView] = useState('past');
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedCompetition, setSelectedCompetition] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        fetchOngoingCompetitions();
        fetchPastCompetitions();
        fetchUpcomingCompetitions();
    }, []);

    const fetchOngoingCompetitions = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/exoshowdown/ongoing-showdown`);
            setLiveCompetitions(response.data.contests);
            calculateTimeLeft(response.data.contests[0].end_date); // Use the first ongoing competition for the countdown
        } catch (error) {
            console.error('Error fetching ongoing competitions:', error);
        }
    };

    const fetchPastCompetitions = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/exoshowdown/past-showdown`);
            setPastCompetitions(response.data.contests);
        } catch (error) {
            console.error('Error fetching past competitions:', error);
        }
    };

    const fetchUpcomingCompetitions = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/exoshowdown/upcoming-showdown`);
            setUpcomingCompetitions(response.data.contests);
        } catch (error) {
            console.error('Error fetching upcoming competitions:', error);
        }
    };

    // Countdown timer logic
    const calculateTimeLeft = (endDate) => {
        const interval = setInterval(() => {
            const now = new Date();
            const end = new Date(endDate);
            const timeRemaining = end - now;

            if (timeRemaining > 0) {
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
                const seconds = Math.floor((timeRemaining / 1000) % 60);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft(null);
                clearInterval(interval);
            }
        }, 1000);
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
        formData.append('contest_id', selectedCompetition.contest_id);

        try {
            await axios.post(`${SERVER_URL}/api/upload-art`, formData);
            toast.success('Art uploaded successfully!');
            setCaption('');
            setDescription('');
            setArtFile(null);
            closePopup();
        } catch (error) {
            toast.error('Error uploading art');
            console.error('Error uploading art:', error);
        }
    };

    const handleJoin = (competition) => {
        setCompetitionJoined(true);
        setSelectedCompetition(competition);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const handleViewChange = (newView) => {
        setView(newView);
    };

    return (
        <>
        <Navbar />
        <ToastContainer />
        <div className="exoshowdown-container">
            <h1 className="title">ExoShowDown: Art Competition</h1>

            {/* Ongoing competitions */}
            {liveCompetitions.length > 0 && (
                <div className="ongoing-competitions">
                    <h2>Ongoing Competitions</h2>
                    {liveCompetitions.map((competition) => (
                        <div key={competition.contest_id} className="competition">
                            <h3>{competition.caption}</h3>
                            <p>{competition.description}</p>
                            {/* <p><strong>Start Date:</strong> {new Date(competition.start_date).toLocaleDateString()}</p>
                            <p><strong>End Date:</strong> {new Date(competition.end_date).toLocaleDateString()}</p> */}
                            <div className="right-side">
                                {timeLeft && (
                                    <div className="countdown">
                                        <strong>Remaining Time:</strong>
                                        <p>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</p>
                                    </div>
                                )}
                                {!competitionJoined && (
                                    <button className="join-button" onClick={() => handleJoin(competition)}>
                                        Register
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Popup for submitting art */}
            {popupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="close-button" onClick={closePopup}>×</button>
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
                            <div key={competition.contest_id} className="competition">
                                <h3>{competition.caption}</h3>
                                <p>{competition.description}</p>
                                <p><strong>Starts on:</strong> {new Date(competition.start_date).toLocaleDateString()}</p>
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
                            <div key={competition.contest_id} className="competition">
                                <h3>{competition.caption}</h3>
                                <p>{competition.description}</p>
                                <p><strong>Start Date:</strong> {new Date(competition.start_date).toLocaleDateString()}</p>
                                <p><strong>End Date:</strong> {new Date(competition.end_date).toLocaleDateString()}</p>
                                <button className="leaderboard-button" onClick={() => window.open(`/leaderboard/${competition.contest_id}`, '_blank')}>Show Leaderboard</button>
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
