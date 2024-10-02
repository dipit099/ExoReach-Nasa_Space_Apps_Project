import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './QuizDetails.css'; 
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import SERVER_URL from '../../config/SERVER_URL';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function QuizDetails() {
    const { quizId } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({}); // Track user answers
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [score, setScore] = useState(0);
    const [quizEnded, setQuizEnded] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state
    const userId = "USER_ID";  // Replace with actual user ID

    useEffect(() => {
        fetchQuizData();
    }, []);

    const fetchQuizData = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/exoquiz/quizzing`, { quizId });
            if (response.data) {
                setQuizData(response.data);
                setTimeRemaining(response.data.numQuestions * 60); // Assuming 60 seconds per question
                setLoading(false); // Stop loading when data is fetched
            } else {
                toast.error('Failed to load quiz data.');
            }
        } catch (error) {
            console.error('Error fetching quiz data:', error);
            toast.error('Error fetching quiz data.');
            setLoading(false); // Stop loading even on error
        }
    };

    useEffect(() => {
        if (timeRemaining > 0 && !quizEnded) {
            const timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeRemaining === 0 && !quizEnded) {
            handleSubmitQuiz();
        }
    }, [timeRemaining, quizEnded]);

    const handleAnswerChange = (questionId, selectedOption) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: selectedOption, // Save the user's selected answer for the question
        });
    };

    const handleSubmitQuiz = async () => {
        setQuizEnded(true);  // Stop countdown when quiz ends
        let totalScore = 0;
        quizData.questions.forEach((question) => {
            if (userAnswers[question.questionId] === question.correctOption) {
                totalScore += 1; // Increment score if the user's answer is correct
            }
        });
        setScore(totalScore);

        // Sending quizId, userId, and score to the server
        try {
            await axios.post(`${SERVER_URL}/exoquiz/submit-quiz-result`, {
                quizId,
                userId,
                score: totalScore
            });
            toast.success('Quiz submitted successfully!');
        } catch (error) {
            console.error('Error submitting quiz data:', error);
            toast.error('Error submitting quiz data.');
        }
    };

    if (loading) {
        return (
            <div className="loading-bar-container">
                <div className="loading-bar"></div>
                <p>Loading quiz...</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="quiz-details-container">
                <h1>{quizData.title}</h1>
                <p>{quizData.description}</p>
                {!quizEnded && <p className="time-remaining">Time Remaining: {timeRemaining}s</p>}

                {quizData.questions && quizData.questions.length > 0 && !quizEnded ? (
                    <div className="quiz-questions">
                        <h3>{quizData.questions[currentQuestionIndex].questionText}</h3>
                        {quizData.questions[currentQuestionIndex].options.map((option, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestionIndex}`}
                                        value={option}
                                        checked={userAnswers[quizData.questions[currentQuestionIndex].questionId] === option || false}
                                        onChange={() => handleAnswerChange(quizData.questions[currentQuestionIndex].questionId, option)}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}

                        {currentQuestionIndex > 0 && (
                            <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                                Previous
                            </button>
                        )}
                        {currentQuestionIndex < quizData.questions.length - 1 ? (
                            <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                                Next
                            </button>
                        ) : (
                            <button onClick={handleSubmitQuiz}>
                                Submit Quiz
                            </button>
                        )}
                    </div>
                ) : (
                    <div>
                        <h3 className="score">Your Score: {score}</h3>
                        {quizData.questions.map((question, index) => (
                            <div key={index} className="result-card">
                                <p>
                                    <strong>Q: {question.questionText}</strong>
                                    <br />
                                    <span className={`user-answer ${userAnswers[question.questionId] === question.correctOption ? 'correct' : 'wrong'}`}>
                                        Your Answer: {userAnswers[question.questionId]}
                                    </span>
                                    <br />
                                    <span className="correct-answer">
                                        Correct Answer: {question.correctOption}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default QuizDetails;
