import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ForumDetail.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SERVER_URL from '../../config/SERVER_URL';

function ForumDetails() {
    const { forum_id } = useParams(); // Extract forum_id from the URL
    const [forumDetails, setForumDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchForumDetails();
    }, [forum_id]);

    const fetchForumDetails = async () => {
        try {
            console.log("forumid:", forum_id);
            const response = await axios.post(`${SERVER_URL}/forum/details`, { forumId: forum_id });
            
            // Extract the forum object from the response
            if (response.data.success && response.data.forum) {
                setForumDetails(response.data.forum);
            } else {
                toast.error('Forum details not found');
            }
            setLoading(false);
            toast.success('Forum details fetched successfully');
        } catch (error) {
            console.error('Error fetching forum details:', error);
            toast.error('Error fetching forum details');
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!forumDetails) {
        return <p>Forum details not found.</p>;
    }

    return (
        <>           
            <div className="forum-details-container">
                <h2>{forumDetails.caption}</h2>
                <p className="forum-description">{forumDetails.description}</p>
                <div className="forum-creator-info">
                    <img
                        src={forumDetails.forum_creator_profile_pic || '/default-avatar.png'}
                        alt="Profile"
                        className="forum-creator-pic"
                    />
                    <span className="forum-creator-username">{forumDetails.forum_creator_username}</span>
                    <span className="forum-created-date">
                        Created on: {new Date(forumDetails.created_at).toLocaleString()}
                    </span>
                </div>
                <div className="forum-stats">
                    <span>Status: {forumDetails.status}</span>
                </div>
                <div className="comments-section">
                    <h3>Comments</h3>
                    <p>No comments yet.</p> {/* You can add the logic for comments if available in future */}
                </div>
            </div>
        </>
    );
}

export default ForumDetails;
