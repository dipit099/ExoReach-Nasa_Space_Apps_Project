const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { forumId, contestId = 0, userId } = req.body; s

    if (!forumId || !userId) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    try {
        const checkQuery = `
            SELECT 1 FROM upvotes 
            WHERE forum_id = $1 AND contest_id = $2 AND user_id = $3
        `;
        
        const result = await req.pool.query(checkQuery, [forumId, contestId, userId]);
        if (result.rows.length > 0) {

            const deleteQuery = `
                DELETE FROM upvotes 
                WHERE forum_id = $1 AND contest_id = $2 AND user_id = $3
            `; 
            await req.pool.query(deleteQuery, [forumId, contestId, userId]);
            return res.status(200).json({ success: true, message: 'Upvote removed successfully' });
        } else {
            const insertQuery = `
                INSERT INTO upvotes (forum_id, contest_id, user_id)
                VALUES ($1, $2, $3)
            `;
            
            await req.pool.query(insertQuery, [forumId, contestId, userId]);
            return res.status(201).json({ success: true, message: 'Upvote added successfully' });
        }
    } catch (error) {
        console.error('Error processing upvote:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
