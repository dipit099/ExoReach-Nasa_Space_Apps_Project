const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { quizId } = req.body; 

    try {
        const topScorersQuery = `
            SELECT u.id AS user_id, u.username, u.profile_pic, r.score
            FROM user_quiz_results r
            JOIN public.users u ON r.user_id = u.id
            WHERE r.quiz_id = $1
            ORDER BY r.score DESC, r.completion_date ASC
            LIMIT 10;  -- Adjust the limit as needed for top N scorers
        `;
        
        const result = await req.pool.query(topScorersQuery, [quizId]);
        res.status(200).json({
            success: true,
            top_scorers: result.rows
        });

    } catch (error) {
        console.error('Error fetching top scorers:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
