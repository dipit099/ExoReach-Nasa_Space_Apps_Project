const express = require('express');
const router = express.Router();

// Define your login logic here
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    
    try {
        const userQuery = await req.pool.query(
            'SELECT * FROM users WHERE username = $1 AND password = crypt($2, password)',
            [username, password]
        );

        if (userQuery.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password.'
            });
        }

        const user = userQuery.rows[0];

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                userId: user.id, 
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
});

module.exports = {
    router    
    
};

