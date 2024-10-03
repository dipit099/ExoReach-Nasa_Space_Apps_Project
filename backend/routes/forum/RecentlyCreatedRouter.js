const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId } = req.body;  
    
    try {
        const publicQuery = `
            SELECT f.id AS forum_id, f.caption, f.description, f.created_at, f.updated_at, f.status,
                   u.id AS forum_creator_id, u.username AS forum_creator_username, u.profile_pic AS forum_creator_profile_pic, 
                   u.full_name AS forum_creator_full_name
            FROM forum f
            JOIN public.users u ON f.user_id = u.id
            WHERE f.status = 'Accepted'
            ORDER BY f.created_at DESC;
        `;
        const publicResult = await req.pool.query(publicQuery);

        const friendsQuery = `
            SELECT f.id AS forum_id, f.user_id AS forum_creator_id, f.caption, f.description, f.created_at, f.updated_at, f.status,
                   u.username AS forum_creator_username, u.profile_pic AS forum_creator_profile_pic, 
                   u.full_name AS forum_creator_full_name
            FROM forum f
            JOIN public.users u ON f.user_id = u.id
            WHERE f.user_id IN (
                SELECT user_id
                FROM followers
                WHERE follower_id = $1
            ) AND f.status = 'Accepted'
            ORDER BY f.created_at DESC;
        `;
        const friendsResult = await req.pool.query(friendsQuery, [userId]);

        const responseData = {
            success: true,
            public: publicResult.rows,  
            friends: friendsResult.rows  
        };

        res.status(200).json(responseData);

    } catch (error) {
        console.error('Error fetching forum data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
