const express = require('express');
const router = express.Router();

router.get('/most_viewed', async (req, res) => {
    try {
        const query = `
            SELECT pl_name, pl_image 
            FROM exoplanet_data 
            ORDER BY times_visited DESC 
            LIMIT 20;
        `;

        const result = await req.pool.query(query);

        return res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching most viewed exoplanets:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
});

module.exports =  router ;  

