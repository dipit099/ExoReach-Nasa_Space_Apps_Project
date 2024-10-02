import React, { useState } from "react";

const AdminExoQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [questions, setQuestions] = useState([]);

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
      alert("Please enter a valid number of questions (1-25).");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      numQuestions === "" ||
      questions.some(
        (q) =>
          !q.questionText || q.options.some((opt) => !opt) || !q.correctOption
      )
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const quizData = {
      title,
      description,
      questions,
    };

    console.log(JSON.stringify(quizData)); // Send this JSON to the server or process it further
    alert("Quiz data submitted!");
  };

  return (
    <div>
      <h2>Create ExoQuiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Questions (max 25):</label>
          <input
            type="number"
            value={numQuestions || ""} // Fix here to handle NaN or empty values
            onChange={handleNumQuestionsChange}
            required
            min="1"
            max="25"
          />
        </div>

        {questions.map((q, index) => (
          <div key={index}>
            <h4>Question {index + 1}</h4>
            <input
              type="text"
              placeholder="Enter question"
              value={q.questionText}
              onChange={(e) =>
                handleQuestionChange(index, "questionText", e.target.value)
              }
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
                  required
                />
              </div>
            ))}
            <div>
              <label>Correct Option:</label>
              <input
                type="number"
                value={q.correctOption}
                onChange={(e) =>
                  handleQuestionChange(index, "correctOption", e.target.value)
                }
                required
                min="1"
                max="4"
              />
            </div>
          </div>
        ))}
        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
};

export default AdminExoQuiz;
