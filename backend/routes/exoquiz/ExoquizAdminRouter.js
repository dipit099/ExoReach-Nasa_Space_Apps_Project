const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { title, description, numQuestions, questions } = req.body;

    try {
        await req.pool.query('BEGIN');

        const insertQuizQuery = `
            INSERT INTO quizzes (title, description)
            VALUES ($1, $2)
            RETURNING quiz_id;
        `;
        const quizResult = await req.pool.query(insertQuizQuery, [title, description]);
        const quizId = quizResult.rows[0].quiz_id;

        for (const question of questions) {
            const insertQuestionQuery = `
                INSERT INTO questions (quiz_id, question_text)
                VALUES ($1, $2)
                RETURNING question_id;
            `;
            const questionResult = await req.pool.query(insertQuestionQuery, [quizId, question.questionText]);
            const questionId = questionResult.rows[0].question_id;

            for (let i = 0; i < question.options.length; i++) {
                const optionText = question.options[i];
                const isCorrect = parseInt(question.correctOption, 10) === i + 1;

                const insertOptionQuery = `
                    INSERT INTO options (question_id, quiz_id, option_text, is_correct)
                    VALUES ($1, $2, $3, $4);
                `;
                await req.pool.query(insertOptionQuery, [questionId, quizId, optionText, isCorrect]);
            }
        }

        await req.pool.query('COMMIT'); 
        res.status(201).json({
            success: true,
            message: 'Quiz and questions successfully created',
            quizId: quizId,
        });
    } catch (error) {
        await req.pool.query('ROLLBACK'); 
        console.error('Error creating quiz:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});



module.exports = router;
