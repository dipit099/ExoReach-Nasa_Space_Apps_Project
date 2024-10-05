const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId } = req.body; 

    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    try {
        const query = `
            SELECT id, username, email, full_name, date_of_birth, country, gender, profile_pic, bio, created_at, updated_at
            FROM users
            WHERE id = $1
        `;

        const result = await req.pool.query(query, [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user: result.rows[0] });

    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
