const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { forumId } = req.body;  
    
    if (!forumId) {
        return res.status(400).json({ success: false, message: 'Missing required forumId' });
    }

    try {
        const commentsQuery = `
            SELECT fc.comment_id, fc.comment, fc.created_at,
                   u.id AS commenter_id, u.username AS commenter_username, u.profile_pic AS commenter_profile_pic
            FROM forum_comment fc
            JOIN public.users u ON fc.user_id = u.id
            WHERE fc.forum_id = $1
            ORDER BY fc.created_at DESC;
        `;
        const result = await req.pool.query(commentsQuery, [forumId]);

        res.status(200).json({ success: true, comments: result.rows });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
