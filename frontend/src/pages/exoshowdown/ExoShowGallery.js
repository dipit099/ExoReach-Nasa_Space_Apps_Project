import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../../config/SERVER_URL';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ExoShowGallery.css'; // Assuming you have a CSS file for styling

function ExoShowGallery() {
    const { exoshowdown_id } = useParams(); // Get the contest ID from the URL (exoshowdown_id)
    const [contestDetails, setContestDetails] = useState(null);
    const [contentDetails, setContentDetails] = useState([]);
    const [sortedByVotes, setSortedByVotes] = useState(false);
    const [contestStatus, setContestStatus] = useState('Ongoing');
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchContestData = async () => {
            try {
                const response = await axios.post(`${SERVER_URL}/exoshowdown/gallery`, { contestId: exoshowdown_id });

                if (response.data && response.data.success) {
                    setContestDetails(response.data.contestDetails);
                    setContentDetails(response.data.contentDetails);
                    toast.success('Contest data fetched successfully');
                    setContestStatus(response.data.contestDetails.contestStatus);
                } else {
                    toast.error('Failed to fetch contest data');
                }
            } catch (error) {
                console.error('Error fetching contest data', error);
                toast.error('Error fetching contest data');
            }
        };

        fetchContestData();
    }, [exoshowdown_id]);

    // Handle upvote/downvote logic (stubbed for now)
    const handleUpvote = async (contentId) => {
        try {
            const response = await axios.post(`${SERVER_URL}/exoshowdown/upvote`, {
                contestId: exoshowdown_id,
                contentId: contentId,
                userId: userId
            });
            if (response.data.success) {
                toast.success(response.data.message);
                if (response.data.upvoted) {
                    updateContentVotes(contentId, 1);  // Increment vote
                } else {
                    updateContentVotes(contentId, -1); // Decrement vote
                }
            } else {
                toast.error('Failed to upvote');
            }
        } catch (error) {
            console.error('Error upvoting', error);
            toast.error('Error upvoting');
        }
    };

    const updateContentVotes = (contentId, voteChange) => {
        setContentDetails((prevContent) =>
            prevContent.map((content) =>
                content.contentId === contentId ? { ...content, upvoteCount: parseInt(content.upvoteCount, 10) + voteChange } : content
            )
        );
    };

    // Toggle sorting by leaderboard (votes) or time submitted
    const toggleLeaderboard = () => {
        setSortedByVotes(!sortedByVotes);
        setContentDetails((prevContent) =>
            [...prevContent].sort((a, b) =>
                sortedByVotes
                    ? new Date(b.registrationDate) - new Date(a.registrationDate) // Sort by registration date (descending when "All" is clicked)
                    : (b.upvoteCount || 0) - (a.upvoteCount || 0) // Sort by upvotes (descending when "Leaderboard" is clicked)
            )
        );
    };

    return (
        <div className="exo-show-gallery">
            <div className='exoShowdown-title'>ExoShowdown Gallery</div>

            {contestDetails ? (
                <div className='contest-top'>
                    <div style={{ width: '95%', margin: '5px 10%' }}>
                        <h2>Contest Details: </h2>
                        <div className="contest-details">
                            <h3 style={{ color: 'var(--text-high)' }}>{contestDetails.contestCaption}</h3>
                            <p style={{ opacity: '0.95', fontSize: '0.9em' }}>{contestDetails.contestDescription}</p>
                            <p style={{ marginBottom: '3px' }}><strong style={{ fontSize: '1.1em' }}>Status:</strong> {contestDetails.contestStatus}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0px' }}>
                                <p><strong style={{ fontSize: '1.1em' }}>Start Date: </strong> {new Date(contestDetails.contestStartDate).toLocaleDateString()}</p>
                                <p><strong style={{ fontSize: '1.1em' }}>End Date: </strong> {new Date(contestDetails.contestEndDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading contest details...</p>
            )}

            <div className='art-gallery-leaderboard'>
                <button className="leaderboard-button" onClick={toggleLeaderboard}>
                    {sortedByVotes ? 'Show All' : 'Show Leaderboard'}
                </button>
            </div>

            <div className="art-gallery">
                {contentDetails.length === 0 ? (
                    <p>No art available for this competition.</p>
                ) : (
                    contentDetails.map((content) => (
                        <div key={content.contentId} className="art-item-card">
                            {console.log(content)}
                            <div className='art-card-top'>
                                <img src={content.contentUrl} alt={content.contentCaption} className="art-image" />
                                <p className="art-title">{content.contentCaption}</p>
                                <p className="art-description">{content.contentDescription}</p>
                            </div>
                            <div className="art-user">
                                <p>By:&nbsp;&nbsp;</p>
                                <img src={content.userProfilePic} alt={content.userName} className="user-profile-pic" />
                                <p>{content.userName}</p>
                            </div>
                            <p className="art-upload-date">
                                Submitted on: {new Date(content.registrationDate).toLocaleDateString()}
                            </p>
                            <div className="votes-section">
                                {contestStatus === 'Ongoing' &&
                                    <button className="vote-button" onClick={() => handleUpvote(content.contentId)}>Upvote</button>
                                }
                                <span className="votes-count">{content.upvoteCount || 0}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ExoShowGallery;
