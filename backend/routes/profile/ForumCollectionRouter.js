const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId } = req.body;
    try {
        const query = `
            SELECT 
                forum.id, 
                forum.caption, 
                forum.description, 
                forum.created_at, 
                forum.updated_at, 
                forum.status, 
                users.username, 
                users.profile_pic
            FROM 
                forum
            JOIN 
                users ON forum.user_id = users.id
            WHERE 
                forum.user_id = $1
            ORDER BY 
                forum.created_at DESC
        `;

        const result = await req.pool.query(query, [userId]);

        res.status(200).json({ success: true, result: result.rows });
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
