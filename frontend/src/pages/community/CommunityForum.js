import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CommunityForum.css';  
import Navbar from '../../components/navbar/Navbar';

function CommunityForum() {
    const [recentlyViewedForums, setRecentlyViewedForums] = useState([]);
    const [recentlyCreatedForums, setRecentlyCreatedForums] = useState([]);
    const [filter, setFilter] = useState('public');  
    const [caption, setCaption] = useState('');
    const [description, setDescription] = useState('');

    // Fetch forum data when the component mounts
    useEffect(() => {
        fetchForums();
    }, [filter]);

    const fetchForums = async () => {
        try {
            const viewedResponse = await axios.get(`/api/forums/recently-viewed?filter=${filter}`);
            const createdResponse = await axios.get(`/api/forums/recently-created?filter=${filter}`);
            setRecentlyViewedForums(viewedResponse.data);
            setRecentlyCreatedForums(createdResponse.data);
        } catch (error) {
            console.error('Error fetching forums:', error);
        }
    };

    const handleFilterChange = (filterType) => {
        setFilter(filterType);
    };

    const handleSubmitQuestion = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/forums', { caption, description });
            if (response.status === 201) {
                console.log('Question submitted successfully');
                setCaption('');
                setDescription('');
                fetchForums(); // Refresh forums after submission
            }
        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };

    return (
        <>
        <Navbar />
        {/* Ask a Question Section */}
        <div className="ask-question-section">
            <h3>Ask a Question</h3>
            <form onSubmit={handleSubmitQuestion}>
                <input
                    type="text"
                    placeholder="Caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>

        <div className="community-forum-container">
            {/* Left Filter Section */}
            <div className="forum-filter">
                <h3>Filter</h3>
                <button
                    className={`filter-button ${filter === 'public' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('public')}
                >
                    Public
                </button>
                <button
                    className={`filter-button ${filter === 'friends' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('friends')}
                >
                    Friends
                </button>
            </div>

            {/* Right Section with Recently Viewed and Created Forums */}
            <div className="right-sections">
                <div className="forum-section">
                    <h3>Recently Viewed Forums</h3>
                    <div className="forum-list">
                        {recentlyViewedForums.map((forum) => (
                            <div key={forum.id} className="forum-card">
                                <Link to={`/forum/${forum.id}`} className="forum-link">
                                    <h4 className="forum-caption">{forum.caption}</h4>
                                    <p className="forum-description">{forum.description}</p>
                                    <div className="forum-info">
                                        <span>Upvotes: {forum.upvotes}</span>
                                        <span>Comments: {forum.commentsCount}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="forum-section">
                    <h3>Recently Created Forums</h3>
                    <div className="forum-list">
                        {recentlyCreatedForums.map((forum) => (
                            <div key={forum.id} className="forum-card">
                                <Link to={`/forum/${forum.id}`} className="forum-link">
                                    <h4 className="forum-caption">{forum.caption}</h4>
                                    <p className="forum-description">{forum.description}</p>
                                    <div className="forum-info">
                                        <span>Upvotes: {forum.upvotes}</span>
                                        <span>Comments: {forum.commentsCount}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default CommunityForum;
