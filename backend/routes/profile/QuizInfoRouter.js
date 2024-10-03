const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { user_id } = req.body; 

    if (!user_id) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    try {
        const query = `
            SELECT 
                q.quiz_id, 
                q.title, 
                q.description, 
                COUNT(que.question_id) AS no_of_questions, 
                uqr.score, 
                uqr.completion_date
            FROM 
                user_quiz_results uqr
            JOIN 
                quizzes q ON uqr.quiz_id = q.quiz_id
            JOIN 
                questions que ON q.quiz_id = que.quiz_id
            WHERE 
                uqr.user_id = $1
            GROUP BY 
                q.quiz_id, uqr.score, uqr.completion_date
            ORDER BY 
                uqr.completion_date DESC
        `;

        const result = await req.pool.query(query, [user_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'No quiz results found for this user' });
        }
        res.status(200).json({ success: true, quizzes: result.rows });

    } catch (error) {
        console.error('Error fetching quiz results:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
