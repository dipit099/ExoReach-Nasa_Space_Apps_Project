const express = require('express');
const router = express.Router();

// DONT FORGET TO USE '/' IN THE ROUTE 
// DONT USE router.get('/hello'.. AGAIN!!!
router.get('/', (req, res) => {
  try {
    console.log('Request to the helloRoute received!');
    const greetingMessage = 'Hello from the helloRoute!';

    res.json({  message: greetingMessage  });

  } catch (error) {
    console.error('Error:', error.message); // Log the error for debugging
    res.status(500).json({
      error: 'An error occurred while processing your request.'
    });
  }
});

module.exports = router;
