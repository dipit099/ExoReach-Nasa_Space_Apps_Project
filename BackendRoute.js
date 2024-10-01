const express = require('express');
const router = express.Router();

// Handle POST request to /login
router.post('/', (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    console.log('Login request received:', { username, password });

    // // Simple validation (You can replace this with actual database validation)
    // if (!username || !password) {
    //   return res.status(400).json({ error: 'Username and password are required' });
    // }

    // // Example: Hardcoded username and password check (replace this with actual logic)
    // if (username === 'admin' && password === 'password123') {
    //   return res.json({ message: 'Login successful', username });
    // } else {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }

    return res.json({ message: 'Login successful', 
                      success: true, 
                      username });

  } catch (error) {
    console.error('Error during login:', error.message); // Log the error for debugging
    res.status(500).json({
      error: 'An error occurred during the login process.'
    });
  }
});

module.exports = router;  // Export the router
