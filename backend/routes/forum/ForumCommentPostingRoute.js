const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { forumId, userId, comment } = req.body;  

    if (!forumId || !userId || !comment) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const insertCommentQuery = `
            INSERT INTO forum_comment (forum_id, user_id, comment)
            VALUES ($1, $2, $3)
            RETURNING comment_id, forum_id, user_id, comment, created_at;
        `;
        const result = await req.pool.query(insertCommentQuery, [forumId, userId, comment]);

        res.status(201).json({ success: true, comment: result.rows[0] });
    } catch (error) {
        console.error('Error posting comment:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;

