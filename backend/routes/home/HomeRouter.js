const express = require('express');
const router = express.Router();

router.post('/most_viewed', async (req, res) => {
    try {
        const query = `
            SELECT DISTINCT
                    pl_image, 
                    pl_name, 
                    disc_year, 
                    pl_cmasse, 
                    sy_dist,
                    times_visited
            FROM exoplanet_data 
            ORDER BY times_visited DESC 
            LIMIT 5;
        `;

        const result = await req.pool.query(query);

        const planets = result.rows.map(planet => ({
            pl_image: planet.pl_image || '----',
            pl_name: planet.pl_name || '----',
            disc_year: planet.disc_year  ? planet.disc_year : '----',  
            pl_cmasse: planet.pl_cmasse  ? planet.pl_cmasse : '----',  
            sy_dist: planet.sy_dist  ? planet.sy_dist : '----',        
        }));

        return res.status(200).json({
            success: true,
            data: planets
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

