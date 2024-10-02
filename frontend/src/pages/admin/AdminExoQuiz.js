import React, { useState } from "react";
import axios from "axios"; 
import SERVER_URL from "../../config/SERVER_URL"; 
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import "./AdminExoQuiz.css";

const AdminExoQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [questions, setQuestions] = useState([]);
  const [endDate, setEndDate] = useState(null); 

  const handleNumQuestionsChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (!isNaN(value) && value <= 25) {
      setNumQuestions(value);
      const newQuestions = Array(value)
        .fill(0)
        .map(() => ({
          questionText: "",
          options: ["", "", "", ""],
          correctOption: "",
        }));
      setQuestions(newQuestions);
    } else if (e.target.value === "") {
      setNumQuestions("");
      setQuestions([]);
    } else {
      toast.error("Please enter a valid number of questions (1-25).");
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      numQuestions === "" ||
      questions.some(
        (q) =>
          !q.questionText || q.options.some((opt) => !opt) || !q.correctOption
      ) ||
      !endDate
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const quizData = {
      title,
      description,
      numQuestions,
      questions,
      endDate, 
    };

    try {
      console.log('ExoQuiz data:', quizData);
      const response = await axios.post(`${SERVER_URL}/exoquiz/admin`, quizData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Quiz data submitted successfully!");
     // console.log(response.data);
    } catch (error) {
      console.error("Error submitting quiz data:", error);
      toast.error("There was an error submitting the quiz. Please try again.");
    }
  };

  return (
    <div className="exoquiz-container">
      <h2>Create ExoQuiz</h2>
      <form onSubmit={handleSubmit} className="exoquiz-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            required
          />
        </div>
        <div className="form-group">
          <label>Number of Questions (max 25):</label>
          <input
            type="number"
            value={numQuestions || ""}
            onChange={handleNumQuestionsChange}
            className="form-input"
            required
            min="1"
            max="25"
          />
        </div>

        {questions.map((q, index) => (
          <div key={index} className="question-group">
            <h4>Question {index + 1}</h4>
            <input
              type="text"
              placeholder="Enter question"
              value={q.questionText}
              onChange={(e) =>
                handleQuestionChange(index, "questionText", e.target.value)
              }
              className="form-input"
              required
            />
            {q.options.map((opt, optIndex) => (
              <div key={optIndex}>
                <input
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(index, optIndex, e.target.value)
                  }
                  className="form-input"
                  required
                />
              </div>
            ))}
            <div className="form-group">
              <label>Correct Option:</label>
              <input
                type="number"
                value={q.correctOption}
                onChange={(e) =>
                  handleQuestionChange(index, "correctOption", e.target.value)
                }
                className="form-input"
                required
                min="1"
                max="4"
              />
            </div>
          </div>
        ))}

        <div className="form-group">
          <label>Quiz End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="form-datepicker"
            required
            dateFormat="yyyy/MM/dd"
            placeholderText="Select End Date"
          />
        </div>

        <button type="submit" className="form-submit-btn">Submit Quiz</button>
      </form>      
    </div>
  );
};

export default AdminExoQuiz;
