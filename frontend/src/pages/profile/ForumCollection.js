import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER_URL from '../../config/SERVER_URL';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForumCollection.css';

function ForumCollection({ userId }) {
    const [forumData, setForumData] = useState([]);

    useEffect(() => {
        const fetchForumInfo = async () => {
            try {
                const response = await axios.post(`${SERVER_URL}/profile/forum-collection`, { userId });
                if (response.data && response.data.success) {
                    setForumData(response.data.result);
                   // toast.success('Forum info fetched successfully');
                } else {
                    toast.error('Failed to fetch forum info');
                }
            } catch (error) {
                console.error('Error fetching forum info:', error.response?.data || error.message);
                toast.error('Error fetching forum info');
            }
        };
        fetchForumInfo();
    }, [userId]);

    if (!forumData.length) return <p className="no-forum-message">No forum info available</p>;

    return (
        <div className="forum-info-section">
            <h3 className="section-title">Forum Collection</h3>
            <div className="forum-items-grid">
                {forumData.map((forum) => (
                    <div key={forum.id} className="forum-item-card">
                        <div className="forum-header">
                            <img src={forum.profile_pic} alt="Profile" className="forum-profile-pic" />
                            <p className="forum-username">@{forum.username}</p>
                        </div>
                        <h4 className="forum-caption">{forum.caption}</h4>
                        <p className="forum-description">{forum.description}</p>
                        <p className="forum-status">Status: {forum.status}</p>
                        <p className="forum-date">
                            Posted on: {new Date(forum.created_at).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ForumCollection;
