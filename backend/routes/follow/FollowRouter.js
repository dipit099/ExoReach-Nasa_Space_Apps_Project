const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { user_id, follower_id } = req.body;

    if (!user_id || !follower_id) {
        return res.status(400).json({ success: false, message: 'user_id and follower_id are required' });
    }

    try {
        const insertQuery = `
            INSERT INTO followers (user_id, follower_id)
            VALUES ($1, $2)
            ON CONFLICT (user_id, follower_id) DO NOTHING;  -- Prevent duplicate entries
        `;
        
        await req.pool.query(insertQuery, [user_id, follower_id]);
        res.status(201).json({ success: true, message: 'Followed successfully' });

    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
