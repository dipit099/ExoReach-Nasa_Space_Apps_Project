import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER_URL from '../../config/SERVER_URL';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProfileInfo.css'; // Import the CSS for ProfileInfo component

function ProfileInfo({ userId, isCurrentUser, loggedInUserId }) {
    const [profile, setProfile] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const response = await axios.post(`${SERVER_URL}/profile/profile-info`, { userId });
                if (response.data && response.data.user) {
                    setProfile(response.data.user);
                } else {
                    toast.error('Failed to fetch profile info');
                }
            } catch (error) {
                console.error('Error fetching profile info', error);
                toast.error('Error fetching profile info');
            }
        };

        const fetchFollowingStatus = async () => {
            try {
                const response = await axios.post(`${SERVER_URL}/follow/is-following`, {
                    followerId: loggedInUserId,
                    userId: userId,
                });
                setIsFollowing(response.data.isFollowing);
            } catch (error) {
                console.error('Error checking follow status', error);
            }
        };

        fetchProfileInfo();
        fetchFollowingStatus();
    }, [userId, loggedInUserId]);

    const handleFollow = async () => {
        if (loggedInUserId && loggedInUserId !== userId) {
            try {
                const response = await axios.post(`${SERVER_URL}/follow`, {
                    followerId: loggedInUserId,
                    userId: userId,
                });
                if (response.data && response.data.success) {
                    setIsFollowing(response.data.following);
                    window.location.reload();
                    //toast.success(response.data.following ? 'Followed successfully!' : 'Unfollowed successfully!');
                } else {
                    toast.error('Failed to update follow status');
                }
            } catch (error) {
                console.error('Error following the user', error);
                toast.error('Error following the user');
            }
        }
    };

    if (!profile) return <p className="loading-message">Loading profile...</p>;

    return (
        <div className="profile-info-section">
            {profile.profile_pic ? (
                <img src={profile.profile_pic} alt="Profile" className="profile-pic" />
            ) : (
                <div className="profile-pic-placeholder">No Image</div>
            )}
            <h2 className="profile-name">{profile.full_name || 'No name available'}</h2>
            <p className="profile-username">@{profile.username}</p>
            <p className="profile-email"><strong>Email: </strong>{profile.email}</p>
            {profile.date_of_birth && (
                <p className="profile-dob">
                    <strong>Date of Birth:</strong> {new Date(profile.date_of_birth).toLocaleDateString()}
                </p>
            )}
            {profile.bio && <p className="profile-bio">{profile.bio}</p>}
            {!isCurrentUser && (
                <button className="follow-btn" onClick={handleFollow}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            )}
        </div>
    );
}

export default ProfileInfo;
