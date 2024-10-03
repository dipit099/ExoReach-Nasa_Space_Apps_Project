const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, caption, description } = req.body;  
    console.log(req.body)
    if (!userId || !caption || !description) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const query = `
            INSERT INTO forum (user_id, caption, description)
            VALUES ($1, $2, $3)
            RETURNING *;  -- Returning the newly created row
        `;
        const result = await req.pool.query(query, [userId, caption, description]);
        res.status(201).json({ success: true, forum: result.rows[0] });
    } catch (error) {
        console.error('Error inserting forum data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
