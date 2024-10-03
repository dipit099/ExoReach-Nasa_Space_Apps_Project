import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER_URL from '../../config/SERVER_URL';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForumCollection({ userId }) {
    const [forumPosts, setForumPosts] = useState([]);

    useEffect(() => {
        const fetchForumCollection = async () => {
            try {
                const response = await axios.post(`${SERVER_URL}/profile/forum-collection`, { userId });
                console.log("forum-collection",response.data);
                toast.success('Forum collection fetched successfully');
                //setForumPosts(response.data);
            } catch (error) {
                console.error('Error fetching forum collection', error);
            }
        };
        fetchForumCollection();
    }, [userId]);

    if (!forumPosts.length) return <p>No forum posts available</p>;

    return (
        <div className="forum-collection">
            <h3>Forum Posts</h3>
            {forumPosts.map((post) => (
                <div key={post.id} className="forum-post">
                    <p>{post.title}</p>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}

export default ForumCollection;
