const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid user ID'
        });
    }

    try {
        const query = `
            SELECT 
                uc.pl_name, ed.pl_category, ed.pl_rade, ed.pl_cmasse, ed.sy_dist, ed.pl_image
            FROM 
                user_cards uc
            INNER JOIN 
                exoplanet_data ed 
            ON 
                uc.pl_name = ed.pl_name
            WHERE 
                uc.user_id = $1
        `;

        const result = await req.pool.query(query, [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No planets found for the given user ID'
            });
        }

        const userPlanets = result.rows.map(planet => ({
            pl_name: planet.pl_name || '----',
            pl_category: planet.pl_category || '----',
            pl_rade: planet.pl_rade ? planet.pl_rade : '----',
            pl_cmasse: planet.pl_cmasse ? planet.pl_cmasse : '----',
            sy_dist: planet.sy_dist ? planet.sy_dist : '----',
            pl_image: planet.pl_image || '----'
        }));

        res.status(200).json({
            success: true,
            message: 'User planets retrieved successfully!',
            userPlanets
        });

    } catch (error) {
        console.error('Error fetching user planets:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;
