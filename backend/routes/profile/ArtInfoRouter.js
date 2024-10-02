const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId } = req.body; 

    try {
        const allContentQuery = `
            SELECT * FROM content
            WHERE user_id = $1
            ORDER BY upload_date DESC
        `;
        const allContentResult = await req.pool.query(allContentQuery, [userId]);

        const registeredContentQuery = `
            SELECT c.* FROM content c
            JOIN content_in_contest cc ON c.id = cc.content_id
            WHERE c.user_id = $1
            ORDER BY cc.registered_in_contest DESC
        `;
        const registeredContentResult = await req.pool.query(registeredContentQuery, [userId]);

        const winningContentQuery = `
            SELECT c.* FROM content c
            JOIN contest_winner cw ON c.id = cw.content_id
            WHERE c.user_id = $1
        `;
        const winningContentResult = await req.pool.query(winningContentQuery, [userId]);

        res.status(200).json({
            success: true,
            allContent: allContentResult.rows,
            registeredContent: registeredContentResult.rows,
            winningContent: winningContentResult.rows
        });
    } catch (error) {
        console.error('Error fetching user content:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
