const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log('Login request received:', req.body);
    const { username, password } = req.body;

    try {
        const userQuery = await req.pool.query(
            `SELECT * FROM users WHERE username = $1 AND password = crypt($2, password)`,
            [username, password]
        );

        if (userQuery.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password.'
            });
        }

        const user = userQuery.rows[0];

        delete user.password;
        delete user.created_at;
        delete user.updated_at;

        Object.keys(user).forEach(key => {
            if (user[key] === null || user[key] === undefined || user[key] === '') {
                user[key] = '---';
            }
        });
        console.log('Login successful:', user);

        return res.status(200).json({
            success: true,
            message: 'Login successful!',
            user
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
});

router.post('/admin', async (req, res) => {
    console.log('Login request received:', req.body);
    const { username, password } = req.body;

    try {
        const userQuery = await req.pool.query(
            `SELECT * FROM admin WHERE username = $1 AND password = $2`,
            [username, password]
        );

        if (userQuery.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password.'
            });
        }

        const user = userQuery.rows[0];
        console.log('Login successful:', user);

        return res.status(200).json({
            success: true,
            message: 'Login successful!',
            user
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
});

module.exports = router    


