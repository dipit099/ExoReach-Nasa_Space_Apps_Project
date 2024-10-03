const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { contestId } = req.body; 

    if (!contestId) {
        return res.status(400).json({ success: false, message: 'Missing required contestId' });
    }


    try {

        const updateQuery = `SELECT update_contest_winners();`
        const updateResult =  await req.pool.query(updateQuery);
        const query = `
            SELECT cw.contest_id, cw.content_id, cw.winning_category, 
                   u.id AS user_id, u.username, u.full_name, u.profile_pic
            FROM contest_winner cw
            JOIN content c ON cw.content_id = c.id
            JOIN public.users u ON c.user_id = u.id
            WHERE cw.contest_id = $1;
        `;

        const result = await req.pool.query(query, [contestId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'No winners found for this contest' });
        }

        res.status(200).json({ success: true, winners: result.rows });
    } catch (error) {
        console.error('Error fetching contest winners:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
