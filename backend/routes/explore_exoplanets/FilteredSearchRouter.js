const express = require('express');
const router = express.Router();
router.get('/', async (req, res) => {
    const { planetTypes, discoveryMethods, telescopes, facilities } = req.query;

    try {
        let query = '';
        const queryParams = [];

        if (!planetTypes && !discoveryMethods && !telescopes && !facilities) {
            query = `
                SELECT DISTINCT
                    pl_image, 
                    pl_name, 
                    disc_year, 
                    pl_cmasse, 
                    sy_dist,
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
                    sy_dist,
                    times_visited 
                FROM exoplanet_data 
                WHERE 1=1 
            `;

            if (planetTypes) {
                const planetTypeList = planetTypes.split(',');
                queryParams.push(planetTypeList);
                query += ` AND pl_category = ANY($${queryParams.length}) `;
            }

            if (discoveryMethods) {
                const discoveryMethodList = discoveryMethods.split(',');
                queryParams.push(discoveryMethodList);
                query += ` AND discoverymethod = ANY($${queryParams.length}) `;
            }

            if (telescopes) {
                const telescopeList = telescopes.split(',');
                queryParams.push(telescopeList);
                query += ` AND disc_telescope = ANY($${queryParams.length}) `;
            }

            if (facilities) {
                const facilityList = facilities.split(',');
                queryParams.push(facilityList);
                query += ` AND disc_facility = ANY($${queryParams.length}) `;
            }
        }

        const result = await req.pool.query(query, queryParams);


        const planets = result.rows.map(planet => ({
            pl_image: planet.pl_image || '----',
            pl_name: planet.pl_name || '----',
            disc_year: planet.disc_year  ? planet.disc_year : '----',  
            pl_cmasse: planet.pl_cmasse  ? planet.pl_cmasse : '----',  
            sy_dist: planet.sy_dist  ? planet.sy_dist : '----',        
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

module.exports = router    

