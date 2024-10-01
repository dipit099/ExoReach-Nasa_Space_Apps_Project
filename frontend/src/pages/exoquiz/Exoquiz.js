import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios for API calls
import './ExoQuiz.css';  // Custom CSS for styling
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer'

function ExoQuiz() {
    const [liveQuizzes, setLiveQuizzes] = useState([]);
    const [pastQuizzes, setPastQuizzes] = useState([]);
    const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [filter, setFilter] = useState('live');  // Default filter is "Live"
    const [leaderboard, setLeaderboard] = useState([]);

    // Fetch quizzes and leaderboard from the API
    useEffect(() => {
        fetchQuizzes();
        fetchLeaderboard();
    }, []);

    // Fetch all quizzes
    const fetchQuizzes = async () => {
        try {
            const liveResponse = await axios.get('/api/live-quizzes');  // Live quizzes
            const pastResponse = await axios.get('/api/past-quizzes');  // Past quizzes
            const upcomingResponse = await axios.get('/api/upcoming-quizzes');  // Upcoming quizzes

            setLiveQuizzes(liveResponse.data);
            setPastQuizzes(pastResponse.data);
            setUpcomingQuizzes(upcomingResponse.data);

            // Set default filtered quizzes to live
            setFilteredQuizzes(liveResponse.data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    // Fetch leaderboard data
    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get('/api/leaderboard');
            setLeaderboard(response.data);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        }
    };

    // Handle answer selection
    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: answer,
        });
    };

    // Submit quiz and fetch results
    const handleSubmitQuiz = async () => {
        try {
            const response = await axios.post(`/api/submit-quiz/${selectedQuiz.id}`, {
                answers: userAnswers,
            });
            setScore(response.data.score);
            setShowResults(true);
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    // Handle filtering of quizzes
    const handleFilterChange = (filterType) => {
        setFilter(filterType);
        if (filterType === 'live') {
            setFilteredQuizzes(liveQuizzes);
        } else if (filterType === 'past') {
            setFilteredQuizzes(pastQuizzes);
        } else if (filterType === 'upcoming') {
            setFilteredQuizzes(upcomingQuizzes);
        }
    };

    return (
        <> 
            <Navbar />
            <div className="quiz-container">
                <h1 className="quiz-header">ExoQuiz: Test Your Knowledge!</h1>

                {/* Filter Section */}
                <div className="filter-buttons">
                    <button
                        onClick={() => handleFilterChange('live')}
                        className={`filter-button ${filter === 'live' ? 'active' : ''}`}
                    >
                        Live Quizzes
                    </button>
                    <button
                        onClick={() => handleFilterChange('upcoming')}
                        className={`filter-button ${filter === 'upcoming' ? 'active' : ''}`}
                    >
                        Upcoming Quizzes
                    </button>
                    <button
                        onClick={() => handleFilterChange('past')}
                        className={`filter-button ${filter === 'past' ? 'active' : ''}`}
                    >
                        Past Quizzes
                    </button>
                </div>

                {/* Filtered Quizzes Section */}
                <section className="quiz-section">
                    {filteredQuizzes.length === 0 && <p className="no-quizzes">No quizzes available for this section.</p>}
                    {filteredQuizzes.map((quiz) => (
                        <div key={quiz.id} className="quiz-card">
                            <h3 className="quiz-title">{quiz.title}</h3>
                            <p className="quiz-description">{quiz.description}</p>
                            {filter === 'live' && !selectedQuiz && (
                                <button className="quiz-button" onClick={() => setSelectedQuiz(quiz)}>Take Quiz</button>
                            )}
                            {filter === 'upcoming' && (
                                <p className="quiz-start-time">Quiz starts on: {new Date(quiz.startTime).toLocaleString()}</p>
                            )}
                            {filter === 'past' && (
                                <>
                                    <h4 className="results-header">Results</h4>
                                    {quiz.questions.map((question) => (
                                        <div key={question.id} className="result-card">
                                            <p className="question-text">{question.text}</p>
                                            <p className="user-answer">
                                                <strong>Your Answer:</strong> {question.userAnswer}
                                            </p>
                                            <p className="correct-answer">
                                                <strong>Correct Answer:</strong> {question.correctAnswer}
                                            </p>
                                            <p className="points">
                                                <strong>Points:</strong> {question.points}
                                            </p>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    ))}

                    {selectedQuiz && !submitted && filter === 'live' && (
                        <div className="quiz-questions">
                            <h3 className="quiz-title">{selectedQuiz.title}</h3>
                            {selectedQuiz.questions.map((question) => (
                                <div key={question.id} className="question-card">
                                    <p className="question-text">{question.text}</p>
                                    {question.options.map((option) => (
                                        <div key={option} className="option">
                                            <label className="option-label">
                                                <input
                                                    type="radio"
                                                    name={`question-${question.id}`}
                                                    value={option}
                                                    onChange={() => handleAnswerChange(question.id, option)}
                                                />
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <button className="submit-button" onClick={handleSubmitQuiz}>Submit Quiz</button>
                        </div>
                    )}

                    {submitted && showResults && (
                        <div className="quiz-results">
                            <h3 className="score">Your Score: {score}</h3>
                            {selectedQuiz.questions.map((question) => (
                                <div key={question.id} className="result-card">
                                    <p className="question-text">{question.text}</p>
                                    <p className="user-answer">
                                        <strong>Your Answer:</strong> {userAnswers[question.id]}
                                    </p>
                                    <p className="correct-answer">
                                        <strong>Correct Answer:</strong> {question.correctAnswer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Leaderboard Section */}
                <section className="leaderboard-section">
                    <h2 className="leaderboard-header">Leaderboard</h2>
                    {leaderboard.length === 0 && <p className="no-leaderboard">No leaderboard data available.</p>}
                    <ul className="leaderboard-list">
                        {leaderboard.map((user, index) => (
                            <li key={user.id} className="leaderboard-item">
                                {index + 1}. {user.username} - {user.totalPoints} points
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
            <div className="blank"></div>
            <Footer/>
        </>
    );
}

export default ExoQuiz;
