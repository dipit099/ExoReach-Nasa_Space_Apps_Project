import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CommunityForum.css';  // Custom CSS for forum styling
import Navbar from '../../components/navbar/Navbar';

function CommunityForum() {
    const [recentlyViewedForums, setRecentlyViewedForums] = useState([]);
    const [recentlyCreatedForums, setRecentlyCreatedForums] = useState([]);
    const [filter, setFilter] = useState('public');  // Default filter

    // Fetch forum data when the component mounts
    useEffect(() => {
        fetchForums();
    }, [filter]);

    // Fetch the forums from the API
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

    // Filter change handler
    const handleFilterChange = (filterType) => {
        setFilter(filterType);
    };

    return (
        <>
        <Navbar />
        <div className="community-forum-container">
            {/* Filter Section */}
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

            {/* Forum Sections */}
            <div className="forum-sections">
                {/* Recently Viewed Forum Section */}
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

                {/* Recently Created Forum Section */}
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
