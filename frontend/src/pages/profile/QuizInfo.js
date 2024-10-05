import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER_URL from '../../config/SERVER_URL';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './QuizInfo.css'; // Assuming the styles are in this file

function QuizInfo({ userId }) {
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        const fetchQuizInfo = async () => {
            try {
                const response = await axios.post(`${SERVER_URL}/profile/quiz-info`, { userId });
                if (response.data && response.data.quizzes) {
                    setQuizData(response.data.quizzes);
                    //toast.success('Quiz info fetched successfully');
                } else {
                    toast.error('Failed to fetch quiz info');
                }
            } catch (error) {
                console.error('Error fetching quiz info:', error.response?.data || error.message);
                toast.error('Error fetching quiz info');
            }
        };
        fetchQuizInfo();
    }, [userId]);

    if (!quizData.length) return <p className="no-quiz-message">No quiz info available</p>;

    return (
        <div className="quiz-info-section">
            <h3 className="section-title">Quiz Info</h3>
            <div className="quiz-items-grid">
                {quizData.map((quiz) => (
                    <div key={quiz.quiz_id} className="quiz-item-card">
                        <h4 className="quiz-title">{quiz.title}</h4>
                        <p className="quiz-description">{quiz.description}</p>
                        <p className="quiz-details">
                            <strong>Questions:</strong> {quiz.no_of_questions}
                        </p>
                        <p className="quiz-score">
                            <strong>Score:</strong> {quiz.score}
                        </p>
                        <p className="quiz-completion-date">
                            <strong>Completed on:</strong> {new Date(quiz.completion_date).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuizInfo;
