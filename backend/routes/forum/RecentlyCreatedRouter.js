const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId } = req.body;  
    
    try {
        const publicQuery = `
            SELECT * FROM forum
            ORDER BY created_at DESC;
        `;
        const publicResult = await req.pool.query(publicQuery);


        const friendsQuery = `
            SELECT f.id, f.user_id, f.caption, f.description, f.created_at, f.updated_at
            FROM forum f
            WHERE f.user_id IN (
                SELECT user_id
                FROM followers
                WHERE follower_id = $1
            )
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
