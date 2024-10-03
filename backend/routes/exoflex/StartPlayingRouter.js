const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { planetInfo, userId } = req.body; 
    if (!Array.isArray(planetInfo) || planetInfo.length !== 3) {
        return res.status(400).json({
            success: false,
            message: 'Please provide 3 planet cards'
        });
    }

    try {
        const userPlanetNames = planetInfo.map(planet => planet.pl_name);

        const query = `
            SELECT 
                pl_name, pl_category, pl_rade, pl_cmasse, sy_dist, pl_image
            FROM 
                exoplanet_data 
            WHERE 
                pl_name NOT IN ($1, $2, $3)
            ORDER BY RANDOM()
            LIMIT 3
        `;

        const result = await req.pool.query(query, userPlanetNames);

        if (result.rows.length !== 3) {
            return res.status(500).json({
                success: false,
                message: 'Could not retrieve random planets'
            });
        }

        const serverPlanets = result.rows; 
        const roundResults = [];

        for (let i = 0; i < 3; i++) {
            let userPlanet = planetInfo[i];
            let randomPlanet = serverPlanets[i];

            if (i === 0) {
                // If either pl_rade is null, user wins the round
                if (userPlanet.pl_rade === null || randomPlanet.pl_rade === null) {
                    roundResults.push(1);
                } else {
                    roundResults.push(userPlanet.pl_rade > randomPlanet.pl_rade ? 1 : 0);
                }
            } else if (i === 1) {
                // If either pl_cmasse is null, user wins the round
                if (userPlanet.pl_cmasse === null || randomPlanet.pl_cmasse === null) {
                    roundResults.push(1);
                } else {
                    roundResults.push(userPlanet.pl_cmasse > randomPlanet.pl_cmasse ? 1 : 0);
                }
            } else if (i === 2) {
                // If either sy_dist is null, user wins the round
                if (userPlanet.sy_dist === null || randomPlanet.sy_dist === null) {
                    roundResults.push(1);
                } else {
                    roundResults.push(userPlanet.sy_dist < randomPlanet.sy_dist ? 1 : 0);
                }
            }
        }

        const resultScore = roundResults.reduce((acc, curr) => acc + curr, 0);
        const finalResult = resultScore >= 2 ? 1 : 0; 

        const updateQuery = `
            UPDATE users 
            SET 
                matches_played = matches_played + 1, 
                matches_won = matches_won + $1 
            WHERE id = $2
        `;
        await req.pool.query(updateQuery, [finalResult, userId]);

        res.status(200).json({
            success: true,
            serverPlanets,
            round_results: roundResults,
            result: finalResult
        });

    } catch (error) {
        console.error('Error during planet comparison:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;
