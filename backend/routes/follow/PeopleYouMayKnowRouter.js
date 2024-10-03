const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { user_id } = req.body; 

    if (!user_id) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    try {
        // Query to get usernames, ids, and profile pics of users excluding the current user
        const query = `
            SELECT id, username, profile_pic
            FROM users
            WHERE id != $1
        `;

        const result = await req.pool.query(query, [user_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'No other users found' });
        }

        res.status(200).json({ success: true, users: result.rows });

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }        

});

module.exports = router;
