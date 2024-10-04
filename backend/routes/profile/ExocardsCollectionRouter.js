const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId } = req.body; 

    try {
        const query = `
            SELECT ed.pl_name, ed.pl_category, ed.pl_rade, ed.pl_cmasse, ed.sy_dist, ed.pl_image 
            FROM user_cards uc 
            JOIN exoplanet_data ed ON uc.pl_name = ed.pl_name 
            WHERE uc.user_id = $1
        `;
        
        const result = await req.pool.query(query, [userId]); 
        const serverPlanets = result.rows.map(planet => ({
            pl_name: planet.pl_name || '----',
            pl_category: planet.pl_category || '----',
            pl_rade: planet.pl_rade ? planet.pl_rade : '----',
            pl_cmasse: planet.pl_cmasse ? planet.pl_cmasse : '----',
            sy_dist: planet.sy_dist ? planet.sy_dist : '----',
            pl_image: planet.pl_image || '----'
        }));

        res.status(200).json({ planets: serverPlanets });
    } catch (error) {
        console.error('Error fetching planets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
