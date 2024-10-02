import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';

const AdminExoShowdown = () => {
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const exoShowdownData = {
      caption,
      description,
      startDate,
      endDate,
    };
    
    // Show alert with the submitted data
    alert(`Submitted!`);
    
    // Optionally, you can also log the data
    console.log(exoShowdownData);
    
    // Send exoShowdownData to the server or further processing
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Caption:</label>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
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
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          required
          dateFormat="yyyy/MM/dd"
          placeholderText="Select Start Date"
        />
      </div>

      <div>
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          required
          dateFormat="yyyy/MM/dd"
          placeholderText="Select End Date"
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AdminExoShowdown;
