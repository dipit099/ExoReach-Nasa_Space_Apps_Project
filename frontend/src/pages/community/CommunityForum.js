import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CommunityForum.css';
import Navbar from '../../components/navbar/Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SERVER_URL from '../../config/SERVER_URL';

function CommunityForum() {
    const [recentlyViewedForums, setRecentlyViewedForums] = useState({ public: [], friends: [] });
    const [recentlyCreatedForums, setRecentlyCreatedForums] = useState({ public: [], friends: [] });
    const [filter, setFilter] = useState('public');
    const [caption, setCaption] = useState('');
    const [description, setDescription] = useState('');
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        fetchForums();
    }, [filter]);

    const fetchForums = async () => {
        try {
            const createdResponse = await axios.post(`${SERVER_URL}/forum/recently-created`,
                { userId }
            );
            const viewedResponse = await axios.post(`${SERVER_URL}/forum/recently-viewed`,
                { userId }
            );
            console.log('Viewed response:', viewedResponse.data);
            console.log('Created response:', createdResponse.data);

            // Extract public and friends data, ensuring they default to an empty array if null
            setRecentlyViewedForums({
                public: Array.isArray(viewedResponse.data.public) ? viewedResponse.data.public : [],
                friends: Array.isArray(viewedResponse.data.friends) ? viewedResponse.data.friends : []
            });

            setRecentlyCreatedForums({
                public: Array.isArray(createdResponse.data.public) ? createdResponse.data.public : [],
                friends: Array.isArray(createdResponse.data.friends) ? createdResponse.data.friends : []
            });

            toast.success('Forums fetched successfully');
        } catch (error) {
            console.error('Error fetching forums:', error);
            toast.error('Error fetching forums');
        }
    };

    const handleFilterChange = (filterType) => {
        setFilter(filterType);
    };

    const handleSubmitQuestion = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting question:', caption, description);
            console.log('User ID:', userId);
            const response = await axios.post(`${SERVER_URL}/forum/submit-forum`, {
                caption,
                description,
                userId
            });
            console.log('Submit forum response:', response.data);            
            toast.success('Question submitted successfully');
            setCaption('');
            setDescription('');
            fetchForums(); // Refresh forums after submission
        } catch (error) {
            console.error('Error submitting question:', error);
            toast.error('Error submitting question');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    // Determine which forums to display based on the selected filter
    const displayedViewedForums = recentlyViewedForums[filter] || [];
    const displayedCreatedForums = recentlyCreatedForums[filter] || [];

    return (
        <>
            <Navbar />
            <div className="ask-question-section">
                <h3>Ask a Question</h3>
                <form onSubmit={handleSubmitQuestion}>
                    <input
                        type="text"
                        placeholder="Caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required
                        className="input-caption"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="textarea-description"
                    />
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>

            <div className="community-forum-container">
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

                <div className="right-sections">
                    <div className="forum-section">
                        <h3>Recently Viewed Forums</h3>
                        <div className="forum-list">
                            {displayedViewedForums.length > 0 ? (
                                displayedViewedForums.map((forum) => (
                                    <div key={forum.forum_id} className="forum-card">
                                        <Link to={`/forum/${forum.forum_id}`} className="forum-link" target='_blank'>
                                            <h4 className="forum-caption">{forum.caption}</h4>
                                            <p className="forum-description">{forum.description}</p>
                                            <div className="forum-creator-info">
                                                <img
                                                    src={forum.forum_creator_profile_pic || '/default-avatar.png'}
                                                    alt="Profile"
                                                    className="forum-creator-pic"
                                                />
                                                <span className="forum-creator-username">
                                                    {forum.forum_creator_username}
                                                </span>
                                            </div>
                                            <p className="forum-created-date">
                                                Created on: {formatDate(forum.created_at)}
                                            </p>
                                            <button className="show-forum-btn">
                                                Show Forum
                                            </button>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No forums found.</p>
                            )}
                        </div>
                    </div>

                    <div className="forum-section">
                        <h3>Recently Created Forums</h3>
                        <div className="forum-list">
                            {displayedCreatedForums.length > 0 ? (
                                displayedCreatedForums.map((forum) => (
                                    <div key={forum.forum_id} className="forum-card">
                                        <Link to={`/forum/${forum.forum_id}`} className="forum-link" target='_blank'>
                                            <h4 className="forum-caption">{forum.caption}</h4>
                                            <p className="forum-description">{forum.description}</p>
                                            <div className="forum-creator-info">
                                                <img
                                                    src={forum.forum_creator_profile_pic || '/default-avatar.png'}
                                                    alt="Profile"
                                                    className="forum-creator-pic"
                                                />
                                                <span className="forum-creator-username">
                                                    {forum.forum_creator_username}
                                                </span>
                                            </div>
                                            <p className="forum-created-date">
                                                Created on: {formatDate(forum.created_at)}
                                            </p>
                                            <button className="show-forum-btn">
                                                Show Forum
                                            </button>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No forums found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CommunityForum;
