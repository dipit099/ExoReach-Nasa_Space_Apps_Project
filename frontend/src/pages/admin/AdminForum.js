import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SERVER_URL from '../../config/SERVER_URL'; // Import server URL
import './AdminForum.css'; // Assuming the CSS is handled in a separate file

const AdminForum = () => {
  const [pendingQuestions, setPendingQuestions] = useState([]);

  // Fetch pending forum questions when the component loads
  useEffect(() => {
    const fetchPendingQuestions = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/pending-forum-questions`);
        setPendingQuestions(response.data);
        toast.info('Pending questions loaded successfully');
      } catch (error) {
        toast.error('Error loading pending questions');
        console.error('Error fetching pending questions:', error);
      }
    };

    fetchPendingQuestions();
  }, []);

  // Function to approve a question
  const approveQuestion = async (questionId) => {
    try {
      const response = await axios.post(`${SERVER_URL}/approve-question`, { questionId });
      if (response.data.success) {
        toast.success('Question approved successfully');
        setPendingQuestions(pendingQuestions.filter(q => q.id !== questionId)); // Remove the approved question from the list
      } else {
        toast.error('Failed to approve the question');
      }
    } catch (error) {
      toast.error('Error approving the question');
      console.error('Error approving question:', error);
    }
  };

  return (
    <div className="admin-forum">      
      {/* <h2>Pending Forum Questions</h2>
      {pendingQuestions.length === 0 ? (
        <p>No pending questions at the moment.</p>
      ) : (
        <ul className="forum-list">
          {pendingQuestions.map((question) => (
            <li key={question.id} className="forum-item">
              <div className="forum-content">
                <h4>{question.title}</h4>
                <p>{question.description}</p>
              </div>
              <button
                className="approve-button"
                onClick={() => approveQuestion(question.id)}
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default AdminForum;
