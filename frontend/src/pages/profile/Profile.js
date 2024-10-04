import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';
import ArtInfo from './ArtInfo';
import ExoCardCollection from './ExoCardCollection';
import QuizInfo from './QuizInfo';
import ForumCollection from './ForumCollection';
import Navbar from '../../components/navbar/Navbar';
import './Profile.css'; // Import the CSS for Profile component

function Profile() {
    const { userId } = useParams();
    const loggedInUserId = localStorage.getItem('user_id');
    const isCurrentUser = loggedInUserId === userId;

    // State to handle the active tab
    const [activeTab, setActiveTab] = useState('art');

    const renderContent = () => {
        switch (activeTab) {
            case 'art':
                return <ArtInfo userId={userId} />;
            case 'cards':
                return <ExoCardCollection userId={userId} />;
            case 'quiz':
                return <QuizInfo userId={userId} />;
            case 'forum':
                return <ForumCollection userId={userId} />;
            default:
                return <ArtInfo userId={userId} />;
        }
    };

    return (
        <div className="profile-page">
            <Navbar />
            {/* ProfileInfo is always displayed */}
            <ProfileInfo userId={userId} isCurrentUser={isCurrentUser} />

            {/* Sub-navbar for tab switching */}
            <div className="sub-navbar">
                <button 
                    className={`tab-btn ${activeTab === 'art' ? 'active' : ''}`}
                    onClick={() => setActiveTab('art')}
                >
                    Art
                </button>
                {/* <button 
                    className={`tab-btn ${activeTab === 'cards' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cards')}
                >
                    Cards
                </button> */}
                <button 
                    className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
                    onClick={() => setActiveTab('quiz')}
                >
                    Quiz
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'forum' ? 'active' : ''}`}
                    onClick={() => setActiveTab('forum')}
                >
                    Forum
                </button>
            </div>

            {/* Display content based on active tab */}
            <div className="profile-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default Profile;
