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
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const userID = localStorage.getItem('user_id');

    useEffect(() => {
        fetchForumDetails();
        fetchComments();
    }, [forum_id]);

    const fetchForumDetails = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/forum/details`, { forumId: forum_id });
            if (response.data.success && response.data.forum) {
                setForumDetails(response.data.forum);
            } else {
                toast.error('Forum details not found');
            }
            setLoading(false);
            toast.success('Forum details fetched successfully');
        } catch (error) {
            toast.error('Error fetching forum details');
            setLoading(false);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/forum/comment/details`, { forumId: forum_id });
            if (response.data.success) {
                setComments(response.data.comments);
            } else {
                toast.error('Comments not found');
            }
        } catch (error) {
            toast.error('Error fetching comments');
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment) {
            toast.error('Please enter a comment.');
            return;
        }
        try {
            const response = await axios.post(`${SERVER_URL}/forum/comment/submit-comment`, {
                forumId: forum_id,
                comment: newComment,
                userId: userID,
            });
            if (response.data.success) {
                setNewComment('');
                fetchComments(); // Refresh comments after submission
                toast.success('Comment submitted successfully');
            } else {
                toast.error('Failed to submit comment');
            }
        } catch (error) {
            toast.error('Error submitting comment');
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
                <div className="forumDetails-creator-info">
                    <div className='forum-creator'>
                        <img
                            src={forumDetails.forum_creator_profile_pic || '/default-avatar.png'}
                            alt="Profile"
                            className="forum-creator-pic"
                        />
                        <span className="forum-creator-username">{forumDetails.forum_creator_username}</span>
                    </div>
                    <span className="forum-created-date">
                        Created on: {new Date(forumDetails.created_at).toLocaleString()}
                    </span>
                </div>
                <div className="forum-stats">
                    <span>Status: {forumDetails.status}</span>
                </div>

                <div className="comments-section">
                    <h3>Comments</h3>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.comment_id} className="comment">
                                <img
                                    src={comment.commenter_profile_pic || '/default-avatar.png'}
                                    alt="Profile"
                                    className="commenter-pic"
                                />
                                <div className="comment-content">
                                    <strong>{comment.commenter_username}:</strong>
                                    <p>{comment.comment}</p>
                                    <span className="comment-date">
                                        {new Date(comment.created_at).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>

                <form onSubmit={handleCommentSubmit} className="comment-form">
                    <textarea
                        placeholder="Add your comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                        className="comment-textarea"
                    />
                    <div className='forum-buttons'>
                        <button type="submit" className="submit-btn">Submit</button>
                        <button type='reset' className='submit-btn' onClick={() => setNewComment('')}>Clear</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ForumDetails;
