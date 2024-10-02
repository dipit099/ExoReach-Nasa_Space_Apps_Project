const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { caption, description, start_date, end_date } = req.body;
    console.log(req.body);

    if (!caption || !description || !start_date || !end_date) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields: caption, description, start_date, end_date.'
        });
    }

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');  
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formattedStartDate = formatDate(start_date);
    const formattedEndDate = formatDate(end_date);

    try {
        const query = `
            INSERT INTO contest (caption, description, start_date, end_date)
            VALUES ($1, $2, $3, $4)
            RETURNING contest_id
        `;
        const values = [caption, description, formattedStartDate, formattedEndDate];

        const result = await req.pool.query(query, values);

        res.status(201).json({
            success: true,
            message: 'Contest successfully created',
            contest_id: result.rows[0].contest_id
        });
    } catch (error) {
        console.error('Error creating contest:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router    

