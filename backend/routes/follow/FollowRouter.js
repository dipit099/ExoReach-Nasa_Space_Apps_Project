const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, followerId } = req.body;

    if (!userId || !followerId) {
        return res.status(400).json({ success: false, message: 'userId and followerId are required' });
    }

    try {
        const checkQuery = `
            SELECT * FROM followers WHERE user_id = $1 AND follower_id = $2;
        `;
        const result = await req.pool.query(checkQuery, [user_id, follower_id]);

        if (result.rows.length > 0) {
            const deleteQuery = `
                DELETE FROM followers WHERE user_id = $1 AND follower_id = $2;
            `;
            await req.pool.query(deleteQuery, [userId, followerId]);
            return res.status(200).json({ success: true, message: 'Unfollowed successfully' });
        } else {
            const insertQuery = `
                INSERT INTO followers (user_id, follower_id)
                VALUES ($1, $2);
            `;
            await req.pool.query(insertQuery, [userId, followerId]);
            return res.status(201).json({ success: true, message: 'Followed successfully' });
        }
    } catch (error) {
        console.error('Error processing follow/unfollow request:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;

