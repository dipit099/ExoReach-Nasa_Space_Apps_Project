const express = require('express');
const router = express.Router();

// Route to toggle upvote
router.post('/', async (req, res) => {
    const { contestId, contentId, userId } = req.body;

    if (!contestId || !contentId || !userId) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    try {
        const checkQuery = `
            SELECT 1 FROM upvotes 
            WHERE contest_id = $1 AND content_id = $2 AND user_id = $3
        `;
        
        const result = await req.pool.query(checkQuery, [contestId, contentId, userId]);
        
        if (result.rows.length > 0) {
            const deleteQuery = `
                DELETE FROM upvotes 
                WHERE contest_id = $1 AND content_id = $2 AND user_id = $3
            `;
            await req.pool.query(deleteQuery, [contestId, contentId, userId]);
            return res.status(200).json({ success: true, message: 'Upvote removed successfully' });
        } else {
            const insertQuery = `
                INSERT INTO upvotes (contest_id, content_id, user_id)
                VALUES ($1, $2, $3)
            `;
            await req.pool.query(insertQuery, [contestId, contentId, userId]);
            return res.status(201).json({ success: true, message: 'Upvote added successfully' });
        }
    } catch (error) {
        console.error('Error processing upvote:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


router.post('/has-upvoted', async (req, res) => {
    const { contestId, contentId, userId } = req.body; 

    if (!contestId || !contentId || !userId) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const checkQuery = `
            SELECT 1 FROM upvotes 
            WHERE contest_id = $1 AND content_id = $2 AND user_id = $3
        `;
        
        const result = await req.pool.query(checkQuery, [contestId, contentId, userId]);
        
        if (result.rows.length > 0) {
            return res.status(200).json({ success: true, hasUpvoted: true });
        } else {
            return res.status(200).json({ success: true, hasUpvoted: false });
        }
    } catch (error) {
        console.error('Error checking upvote status:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
