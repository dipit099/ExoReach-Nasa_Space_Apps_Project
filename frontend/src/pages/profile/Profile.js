import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';
import ArtInfo from './ArtInfo';
import ExoCardCollection from './ExoCardCollection';
import QuizInfo from './QuizInfo';
import ForumCollection from './ForumCollection';
import Navbar from '../../components/navbar/Navbar';



function Profile() {
    const { userId } = useParams();
    const loggedInUserId = localStorage.getItem('user_id');
    const isCurrentUser = loggedInUserId === userId;

    return (
        <div className="profile-page">
            <Navbar />
            <ProfileInfo userId={userId} isCurrentUser={isCurrentUser} />
            <ArtInfo userId={userId} />
            <ExoCardCollection userId={userId} />
            <QuizInfo userId={userId} />
            <ForumCollection userId={userId} />
        </div>
    );
}

export default Profile;
