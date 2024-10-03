const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId } = req.body; 

    try {
        const userQuery = `
            SELECT id, username, email, full_name, date_of_birth, country, gender, profile_pic, bio, created_at, updated_at 
            FROM users
            WHERE id = $1
        `;
        const userResult = await req.pool.query(userQuery, [userId]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user: userResult.rows[0] });

    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/update-info', async (req, res) => {

    const { userId, full_name, date_of_birth, country, gender, profile_pic, bio } = req.body;
    const requiredFields = { full_name, date_of_birth, country, gender, profile_pic, bio };

    for (let field in requiredFields) {
        if (!requiredFields[field] || requiredFields[field].trim() === '') {
            return res.status(400).json({ success: false, message: `${field.replace('_', ' ')} cannot be empty` });
        }
    }
    try {
        const userQuery = `
            SELECT id 
            FROM users
            WHERE id = $1
        `;
        const userResult = await req.pool.query(userQuery, [userId]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const updateQuery = `
            UPDATE users
            SET full_name = $1, date_of_birth = $2, country = $3, gender = $4, profile_pic = $5, bio = $6, updated_at = CURRENT_TIMESTAMP
            WHERE id = $7
        `;
        await req.pool.query(updateQuery, [full_name, date_of_birth, country, gender, profile_pic, bio, userId]);

        res.status(200).json({ success: true, message: 'User information updated successfully' });

    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
