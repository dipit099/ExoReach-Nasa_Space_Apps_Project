const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = `SELECT * FROM forum WHERE status = 'Pending'`;
        const result = await req.pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching pending forums:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/accept-forum/:forumId', async (req, res) => {
    const { forumId } = req.params; 

    try {
        const updateQuery = `UPDATE forum SET status = 'Accepted' WHERE id = $1 AND status = 'Pending' RETURNING *`;
        const result = await req.pool.query(updateQuery, [forumId]);

        if (result.rowCount === 0) {
            res.status(404).json({ success: false, message: 'Forum not found or already accepted/rejected' });
        } else {
            res.status(200).json({ success: true, message: 'Forum accepted', forum: result.rows[0] });
        }
    } catch (error) {
        console.error('Error accepting forum:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/reject-forum/:forumId', async (req, res) => {
    const { forumId } = req.params; 

    try {
        const updateQuery = `UPDATE forum SET status = 'Rejected' WHERE id = $1 AND status = 'Pending' RETURNING *`;
        const result = await req.pool.query(updateQuery, [forumId]);

        if (result.rowCount === 0) {
            res.status(404).json({ success: false, message: 'Forum not found or already accepted/rejected' });
        } else {
            res.status(200).json({ success: true, message: 'Forum rejected', forum: result.rows[0] });
        }
    } catch (error) {
        console.error('Error rejecting forum:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
