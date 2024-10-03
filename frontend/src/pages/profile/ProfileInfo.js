import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER_URL from '../../config/SERVER_URL';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileInfo({ userId, isCurrentUser }) {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const response = await axios.post(`${SERVER_URL}/profile/profile-info`, { userId });
                if (response.data && response.data.user) {
                    setProfile(response.data.user);
                    toast.success('Profile info fetched successfully');
                } else {
                    toast.error('Failed to fetch profile info');
                }
            } catch (error) {
                console.error('Error fetching profile info', error);
                toast.error('Error fetching profile info');
            }
        };
        fetchProfileInfo();
    }, [userId]);

    if (!profile) return <p>Loading profile...</p>;

    return (
        <div className="profile-info">
            {profile.profile_pic ? (
                <img src={profile.profile_pic} alt="Profile" className="profile-pic" />
            ) : (
                <div className="profile-pic-placeholder">No Image</div>
            )}
            <h2>{profile.full_name || 'No name available'}</h2>
            <p>@{profile.username}</p>
            <p>{profile.bio || 'No bio available'}</p>
            {!isCurrentUser && (
                <button className="follow-btn" onClick={() => handleFollow(userId)}>Follow</button>
            )}
        </div>
    );
}

async function handleFollow(userId) {
    try {
        await axios.post(`${SERVER_URL}/profile/follow`, { userId });
        toast.success('Followed successfully!');
    } catch (error) {
        console.error('Error following the user', error);
        toast.error('Error following the user');
    }
}

export default ProfileInfo;
