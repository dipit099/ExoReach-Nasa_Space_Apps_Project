import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SERVER_URL from '../../config/SERVER_URL';  // Import SERVER_URL
import './AdminExoShowdown.css'; 

const AdminExoShowdown = () => {
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exoShowdownData = {
      caption,
      description,
      startDate,
      endDate,
    };
    
    try {
      console.log('ExoShowDown data:', exoShowdownData);
      const response = await axios.post(`${SERVER_URL}/exoshowdown/admin`, exoShowdownData);
      toast.success('ExoShowDown data submitted successfully!');
      console.log(response.data);
    } catch (error) {
      toast.error('Error submitting data. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="exo-form">
        <div className="form-group">
          <label className="form-label">Caption:</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="form-datepicker"
            required
            dateFormat="yyyy/MM/dd"
            placeholderText="Select Start Date"
          />
        </div>

        <div className="form-group">
          <label className="form-label">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="form-datepicker"
            required
            dateFormat="yyyy/MM/dd"
            placeholderText="Select End Date"
          />
        </div>

        <button type="submit" className="form-submit-btn">Submit</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default AdminExoShowdown;
