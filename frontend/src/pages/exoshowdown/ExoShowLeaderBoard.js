import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../../config/SERVER_URL';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ExoShowLeaderBoard.css'; // Assuming you have a CSS file for styling

function ExoShowLeaderBoard() {
    const { exoshowdown_id } = useParams(); // Get the exoshowdown_id from the URL
    const [winners, setWinners] = useState([]);

    useEffect(() => {
        fetchLeaderboard();
    }, [exoshowdown_id]);

    const fetchLeaderboard = async () => {
        try {
            console.log("Fetching leaderboard for exoshowdown_id:", exoshowdown_id);
            const response = await axios.post(`${SERVER_URL}/exoshowdown/leaderboard`, { contestId: exoshowdown_id });
            console.log("Leaderboard response:", response.data);
            if (response.data && response.data.winners) {
                setWinners(response.data.winners);
            } else {
                toast.error('No winners found for this competition.');
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            toast.error('Error fetching leaderboard');
        }
    };

    if (!winners.length) {
        return <p className="no-winners-message">No winners available for this competition.</p>;
    }

    return (
        <div className="leaderboard-container">
            <h2>Leaderboard for Competition {exoshowdown_id}</h2>
            <div className="leaderboard-items">
                {winners.map((winner, index) => (
                    <div key={winner.user_id} className="leaderboard-item">
                        <div className="leaderboard-rank">
                            <p><strong>Rank {index + 1}:</strong> {winner.username}</p>
                        </div>
                        <div className="leaderboard-user">
                            <img 
                                src={winner.profile_pic || '/default-avatar.png'} 
                                alt="Profile" 
                                className="leaderboard-avatar" 
                            />
                            <p><strong>{winner.full_name || winner.username}</strong></p>
                        </div>
                        <p><strong>Votes:</strong> {winner.obtained_votes}</p>
                        <p><strong>Category:</strong> {winner.winning_category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExoShowLeaderBoard;
