const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { quizId } = req.body;
    console.log("quizid=",quizId)
    try {
        const quizQuery = `
            SELECT title, description
            FROM quizzes
            WHERE quiz_id = $1;
        `;
        const quizResult = await req.pool.query(quizQuery, [quizId]);
        if (quizResult.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
        }

        const quiz = quizResult.rows[0];

        const questionsQuery = `
            SELECT q.question_id, q.question_text, 
            array_agg(o.option_text ORDER BY o.option_id) AS options,
            MAX(CASE WHEN o.is_correct THEN o.option_id ELSE NULL END) AS correct_option_id
            FROM questions q
            LEFT JOIN options o ON q.question_id = o.question_id AND o.quiz_id = q.quiz_id
            WHERE q.quiz_id = $1
            GROUP BY q.question_id, q.question_text
            ORDER BY q.question_id;
        `;
        const questionsResult = await req.pool.query(questionsQuery, [quizId]);

        const questions = questionsResult.rows.map((row) => ({
            questionText: row.question_text,
            options: row.options,
            correctOption: row.correct_option_id,
        }));

        const responseData = {
            success: true,
            title: quiz.title,
            description: quiz.description,
            numQuestions: questions.length,
            questions,
        };

        res.status(200).json(responseData);
        console.log(responseData);

    } catch (error) {
        console.error('Error fetching quiz data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/submit-quiz-result', async (req, res) => {
    const { userId, quizId, totalMarks } = req.body;
    console.log(req.body)
    if (!userId || !quizId || totalMarks === undefined) {
        return res.status(400).json({ success: false, message: 'Missing required fields (userId, quizId, score)' });
    }

    try {
        const insertQuery = `
            INSERT INTO user_quiz_results (user_id, quiz_id, score)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, quiz_id) DO NOTHING;
        `;

        await req.pool.query(insertQuery, [userId, quizId, totalMarks]);

        res.status(200).json({ success: true, message: 'Quiz result saved successfully' });

    } catch (error) {
        console.error('Error saving quiz result:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;


