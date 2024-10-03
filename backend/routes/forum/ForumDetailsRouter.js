const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { forumId } = req.body;  
    console.log("forum id: " + forumId)
    if (!forumId) {
        return res.status(400).json({ success: false, message: 'Missing required forumId' });
    }

    try {
        const query = `
            SELECT f.id AS forum_id, f.caption, f.description, f.created_at, f.updated_at, f.status,
                   u.id AS forum_creator_id, u.username AS forum_creator_username, u.full_name AS forum_creator_full_name, 
                   u.profile_pic AS forum_creator_profile_pic
            FROM forum f
            JOIN public.users u ON f.user_id = u.id
            WHERE f.id = $1;
        `;
        const result = await req.pool.query(query, [forumId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Forum not found' });
        }

        res.status(200).json({ success: true, forum: result.rows[0] });
    } catch (error) {
        console.error('Error fetching forum details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
