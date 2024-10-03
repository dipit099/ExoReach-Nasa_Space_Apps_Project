const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { user_id, caption, description } = req.body;  

    if (!user_id || !caption || !description) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const query = `
            INSERT INTO forum (user_id, caption, description)
            VALUES ($1, $2, $3)
            RETURNING *;  -- Returning the newly created row
        `;
        const result = await req.pool.query(query, [user_id, caption, description]);
        res.status(201).json({ success: true, forum: result.rows[0] });
    } catch (error) {
        console.error('Error inserting forum data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
