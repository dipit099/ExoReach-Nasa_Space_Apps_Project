const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { title, description, numQuestions, questions, end_date } = req.body;

    try {
        await req.pool.query('BEGIN');

        const insertQuizQuery = `
            INSERT INTO quizzes (title, description, end_date)
            VALUES ($1, $2, $3)
            RETURNING quiz_id;
        `;
        const quizResult = await req.pool.query(insertQuizQuery, [title, description, end_date]);
        const quizId = quizResult.rows[0].quiz_id;

        for (let qIndex = 0; qIndex < questions.length; qIndex++) {
            const question = questions[qIndex];
            const questionId = qIndex + 1;  

            const insertQuestionQuery = `
                INSERT INTO questions (question_id, quiz_id, question_text)
                VALUES ($1, $2, $3);
            `;
            await req.pool.query(insertQuestionQuery, [questionId, quizId, question.questionText]);
            for (let optIndex = 0; optIndex < question.options.length; optIndex++) {
                const optionText = question.options[optIndex];
                const optionId = optIndex + 1; 
                const isCorrect = parseInt(question.correctOption, 10) === optIndex + 1;  

                const insertOptionQuery = `
                    INSERT INTO options (option_id, question_id, quiz_id, option_text, is_correct)
                    VALUES ($1, $2, $3, $4, $5);
                `;
                await req.pool.query(insertOptionQuery, [optionId, questionId, quizId, optionText, isCorrect]);
            }
        }

        await req.pool.query('COMMIT');
        res.status(201).json({
            success: true,
            message: 'Quiz, questions, and options successfully created',
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
