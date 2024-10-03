import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SERVER_URL from '../../config/SERVER_URL';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function QuizInfo({ userId }) {
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        const fetchQuizInfo = async () => {
            console.log("userId in quizinfo", userId);
            try {
                const response = await axios.post(`${SERVER_URL}/profile/quiz-info`, { userId });
                console.log("quiz-info", response.data);
                //setQuizData(response.data);
                toast.success('Quiz info fetched successfully');
            } catch (error) {
                console.error('Error fetching quiz info:', error.response?.data || error.message);
                toast.error('Error fetching quiz info');
            }
            
        };
        fetchQuizInfo();
    }, [userId]);

    if (!quizData.length) return <p>No quiz info available</p>;

    return (
        <div className="quiz-info">
            <h3>Quiz Info</h3>
            {quizData.map((quiz) => (
                <div key={quiz.quizId} className="quiz-item">
                    <p>{quiz.title}</p>
                    <p>Score: {quiz.score}</p>
                </div>
            ))}
        </div>
    );
}

export default QuizInfo;
