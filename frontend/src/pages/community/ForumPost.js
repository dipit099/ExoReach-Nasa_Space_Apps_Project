import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ForumPost.css';  // Custom CSS for styling

function ForumPost({ match }) {
    const [forumPost, setForumPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const forumId = match.params.id;

    // Fetch the forum post and its comments
    useEffect(() => {
        fetchForumPost();
    }, []);

    const fetchForumPost = async () => {
        try {
            const postResponse = await axios.get(`/api/forums/${forumId}`);
            setForumPost(postResponse.data);

            const commentsResponse = await axios.get(`/api/forums/${forumId}/comments`);
            setComments(commentsResponse.data);
        } catch (error) {
            console.error('Error fetching forum post:', error);
        }
    };

    // Handle upvote
    const handleUpvote = async () => {
        try {
            await axios.post(`/api/forums/${forumId}/upvote`);
            setForumPost({ ...forumPost, upvotes: forumPost.upvotes + 1 });
        } catch (error) {
            console.error('Error upvoting forum post:', error);
        }
    };

    // Handle comment submission
    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(`/api/forums/${forumId}/comments`, {
                text: newComment,
            });
            setComments([...comments, response.data]);
            setNewComment('');  // Clear input after submission
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div className="forum-post-container">
            {forumPost && (
                <>
                    <h2 className="forum-post-caption">{forumPost.caption}</h2>
                    <p className="forum-post-description">{forumPost.description}</p>
                    <div className="forum-post-info">
                        <span>Upvotes: {forumPost.upvotes}</span>
                        <button className="upvote-button" onClick={handleUpvote}>
                            Upvote
                        </button>
                    </div>

                    <h3>Comments</h3>
                    <div className="comments-section">
                        {comments.map((comment) => (
                            <div key={comment.id} className="comment-card">
                                <p>{comment.text}</p>
                            </div>
                        ))}

                        {/* Add Comment */}
                        <div className="add-comment">
                            <textarea
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            ></textarea>
                            <button onClick={handleCommentSubmit}>Submit</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ForumPost;
