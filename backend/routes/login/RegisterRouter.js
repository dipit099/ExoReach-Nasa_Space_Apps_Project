const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getDownloadURL, uploadBytesResumable, ref } = require('firebase/storage');
const { storage } = require('../../config/firebaseConfig');


router.post('/', async (req, res) => {
    console.log(req.body);
    const { fullName, dateOfBirth, username, email, password, confirmPassword, gender} = req.body;
    if (!fullName || !username || !email || !password || !confirmPassword || !dateOfBirth) {
        return res.status(400).json({
            success: false,
            message: "All fields are required. Please fill in all the information."
        });
    }

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match."
            });
        }

        const userExists = await req.pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Username or email is already in use."
            });
        }

        await req.pool.query(
            `INSERT INTO users (username, email, password, full_name, date_of_birth, gender) 
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [username, email, password, fullName, dateOfBirth, gender]
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully!"
        });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
});

module.exports = router    


