import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SERVER_URL from '../../config/SERVER_URL';
import './QuizDetails.css';  // Importing the CSS file

const QuizDetails = () => {
  const { quizId, userID } = useParams();  // Getting quizId and userID from the URL params
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); // To store user's answers

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  useEffect(() => {
    if (timer > 0 && !isSubmitted) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 && !isSubmitted) {
      handleNextQuestion();
    }
  }, [timer, isSubmitted]);

  const fetchQuizDetails = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/exoquiz/quizzing`, { quizId });
      setQuiz(response.data);
    } catch (error) {
      toast.error('Failed to fetch quiz details');
    }
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    // Store the user's selected answer
    setUserAnswers([...userAnswers, selectedOption]);

    if (selectedOption === quiz.questions[currentQuestionIndex].correctOption) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setTimer(60);  // reset timer for the next question
    } else {
      setIsSubmitted(true);
      toast.success('Quiz submitted!');
    }
  };

  const handleSubmit = async () => {
    // Store the last answer
    setUserAnswers([...userAnswers, selectedOption]);

    if (selectedOption === quiz.questions[currentQuestionIndex].correctOption) {
      setScore(score + 1);
    }
    setIsSubmitted(true);
    setTimer(0);

    // Send data to the server (optional)
    // try {
    //   await axios.post(`${SERVER_URL}/exoquiz/submit`, {
    //     userId: userID,
    //     quizId: quizId,
    //     totalMarks: score,
    //   });
    //   toast.success('Quiz submitted successfully!');
    // } catch (error) {
    //   toast.error('Failed to submit quiz');
    // }
    toast.success('Quiz submitted successfully!');
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">{quiz.title}</h1>
      <p className="quiz-description">{quiz.description}</p>
      
      {!isSubmitted ? (
        <>
          <div className="question-container">
            <p className="question-status">Question {currentQuestionIndex + 1} of {quiz.numQuestions}</p>
            <h2 className="question-text">{quiz.questions[currentQuestionIndex].questionText}</h2>
            <ul className="options">
              {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="option"
                    value={index}
                    checked={selectedOption === index}
                    onChange={() => handleOptionSelect(index)}
                  />
                  <label htmlFor={`option-${index}`} className="option-label">{option}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="timer">
            Time left: {timer} seconds
          </div>

          <button className="next-button" onClick={handleNextQuestion} disabled={selectedOption === null}>
            {currentQuestionIndex < quiz.numQuestions - 1 ? "Next Question" : "Submit Quiz"}
          </button>
        </>
      ) : (
        <div className="quiz-results">
          <h2 className="results-title">Quiz Completed!</h2>
          <p className="results-score">Your Score: {score} / {quiz.numQuestions}</p>
          <h3 className="correct-answers-title">Your Answers vs Correct Answers:</h3>
          <ul className="correct-answers-list">
            {quiz.questions.map((q, index) => (
              <li key={index} className="correct-answer-item">
                <p className="question-text">{q.questionText}</p>
                <p>
                  Your Answer: <span className={userAnswers[index] === q.correctOption ? 'correct' : 'wrong'}>
                    {q.options[userAnswers[index]] || "Not answered"}
                  </span>
                </p>
                <p>
                  Correct Answer: <span className="correct">{q.options[q.correctOption]}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizDetails;
