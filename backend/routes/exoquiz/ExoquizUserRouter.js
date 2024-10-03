const express = require('express');
const router = express.Router();

router.post('/past-quiz', async (req, res) => {
    const { userId } = req.body; 

    try {
        const query = `
            SELECT q.quiz_id, q.title, q.description, COUNT(ques.question_id) AS num_questions
            FROM quizzes q
            LEFT JOIN questions ques ON q.quiz_id = ques.quiz_id
            WHERE q.end_date < CURRENT_DATE
              AND NOT EXISTS (
                SELECT 1
                FROM user_quiz_results uqr
                WHERE uqr.quiz_id = q.quiz_id
                  AND uqr.user_id = $1
              )
            GROUP BY q.quiz_id
            ORDER BY q.end_date DESC;
        `;

        const result = await req.pool.query(query, [userId]);

        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching past quizzes:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/ongoing-quiz', async (req, res) => {
    const { userId } = req.body;  

    try {
        const query = `
            SELECT q.quiz_id, q.title, q.description, COUNT(ques.question_id) AS num_questions
            FROM quizzes q
            LEFT JOIN questions ques ON q.quiz_id = ques.quiz_id
            WHERE (q.end_date > CURRENT_DATE OR q.end_date IS NULL)
              AND NOT EXISTS (
                SELECT 1
                FROM user_quiz_results uqr
                WHERE uqr.quiz_id = q.quiz_id
                  AND uqr.user_id = $1
              )
            GROUP BY q.quiz_id
            ORDER BY q.creation_date DESC;
        `;

        const result = await req.pool.query(query, [userId]);

        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching ongoing quizzes:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
