const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { plName, discYear, plCategory } = req.body;
    try {
        let query = '';
        const queryParams = [];

        if (!plName && !discYear && !plCategory) {
            query = `
                SELECT DISTINCT
                    pl_image, 
                    pl_name, 
                    disc_year, 
                    pl_cmasse, 
                    times_visited 
                FROM exoplanet_data 
                ORDER BY times_visited DESC 
                LIMIT 20
            `;
        } else {
            query = `
                SELECT DISTINCT
                    pl_image, 
                    pl_name, 
                    disc_year, 
                    pl_cmasse, 
                    times_visited 
                FROM exoplanet_data 
                WHERE 1=1 
            `;

            if (plName) {
                queryParams.push(`%${plName}%`);
                query += ` AND pl_name ILIKE $${queryParams.length} `;
            }

            if (discYear) {
                queryParams.push(discYear);
                query += ` AND disc_year = $${queryParams.length} `;
            }

            if (plCategory) {
                const categoryList = plCategory.split(',');
                queryParams.push(categoryList);
                query += ` AND pl_category = ANY($${queryParams.length}) `;
            }
        }

        const result = await req.pool.query(query, queryParams);

        const planets = result.rows.map(planet => ({
            pl_image: planet.pl_image || '----',
            pl_name: planet.pl_name || '----',
            disc_year: planet.disc_year ? planet.disc_year : '----',
            pl_cmasse: planet.pl_cmasse ? planet.pl_cmasse : '----',
        }));

        res.status(200).json({
            success: true,
            planets: planets,
            count: planets.length,
        });

    } catch (error) {
        console.error('Error fetching filtered search data:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;
