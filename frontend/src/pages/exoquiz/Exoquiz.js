import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExoQuiz.css'; 
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import SERVER_URL from '../../config/SERVER_URL';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ExoQuiz() {
    const [liveQuizzes, setLiveQuizzes] = useState({ success: false, data: [] });
    const [pastQuizzes, setPastQuizzes] = useState({ success: false, data: [] });
    const [filteredQuizzes, setFilteredQuizzes] = useState({ success: false, data: [] });
    const [filter, setFilter] = useState('live');

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            console.log('Fetching quizzes...');
            const liveResponse = await axios.post(`${SERVER_URL}/exoquiz/ongoing-quiz`);
            const pastResponse = await axios.post(`${SERVER_URL}/exoquiz/past-quiz`);
            setLiveQuizzes(liveResponse.data || { success: false, data: [] });
            setPastQuizzes(pastResponse.data || { success: false, data: [] });
            setFilteredQuizzes(liveResponse.data || { success: false, data: [] });
            toast.success('Quizzes loaded successfully!');
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    const handleFilterChange = (filterType) => {
        setFilter(filterType);
        if (filterType === 'live') {
            setFilteredQuizzes(liveQuizzes);
        } else if (filterType === 'past') {
            setFilteredQuizzes(pastQuizzes);
        }
    };

    return (
        <>
            <Navbar />
            <div className="quiz-container">
                <h1 className="quiz-header">ExoQuiz: Test Your Knowledge!</h1>

                <div className="filter-buttons">                
                    <button
                        onClick={() => handleFilterChange('live')}
                        className={`filter-button ${filter === 'live' ? 'active' : ''}`}
                    >
                        Live Quizzes
                    </button>    
                    <button
                        onClick={() => handleFilterChange('past')}
                        className={`filter-button ${filter === 'past' ? 'active' : ''}`}
                    >
                        Past Quizzes
                    </button>               
                </div>

                <section className="quiz-section">
                    {filteredQuizzes.data.length === 0 && <p className="no-quizzes">No quizzes available for this section.</p>}
                    {Array.isArray(filteredQuizzes.data) && filteredQuizzes.data.map((quiz) => (
                        <div key={quiz.quiz_id} className="quiz-card">
                            <h3 className="quiz-title">{quiz.title}</h3>
                            <p className="quiz-description">{quiz.description}</p>
                            <Link to={`/exoquiz/${quiz.quiz_id}`} target='_blank'>
                                <button className="quiz-button">Start Your Quiz</button>
                            </Link>
                        </div>
                    ))}
                </section>
            </div>
            <Footer />
        </>
    );
}

export default ExoQuiz;
