const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId } = req.body; 

    try {
        const query = `SELECT * FROM forum WHERE user_id = $1 ORDER BY created_at DESC`;
        const result = await req.pool.query(query, [userId]);
        res.status(200).json({sucess: true, result: result.rows});
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
