const express = require('express');
const router = express.Router();

const getCurrentDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    return today; 
};

router.post('/past-showdown', async (req, res) => {
    const currentDate = getCurrentDate();
    console.log("hi")
    const query = `
        SELECT * FROM contest
        WHERE end_date < $1
    `;

    try {
        const result = await req.pool.query(query, [currentDate]);
        console.log(result)
        res.status(200).json({
            success: true,
            contests: result.rows,
            status: "Ended"
        });
    } catch (error) {
        console.error('Error fetching past contests:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

router.post('/ongoing-showdown', async (req, res) => {
    const currentDate = getCurrentDate();
    console.log("hi")
    console.log(req.query.message)
    const query = `
        SELECT * FROM contest
        WHERE start_date <= $1 AND end_date >= $1
    `;

    try {
        const result = await req.pool.query(query, [currentDate]);
        console.log(result)
        res.status(200).json({
            success: true,
            contests: result.rows,
            status: "Ongoing"
        });
    } catch (error) {
        console.error('Error fetching ongoing contests:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

router.post('/upcoming-showdown', async (req, res) => {
    const currentDate = getCurrentDate();
    console.log("hi")
    const query = `
        SELECT * FROM contest
        WHERE start_date > $1
    `;

    try {
        const result = await req.pool.query(query, [currentDate]);
        console.log(result)
        res.status(200).json({
            success: true,
            contests: result.rows,
            status: "Upcoming"
        });
    } catch (error) {
        console.error('Error fetching future contests:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

router.post('/all_showdowns', async (req, res) => {
    const currentDate = getCurrentDate();
    console.log("hi")
    console.log(result)
    const query = `
        SELECT * FROM contest
    `;

    try {
        const result = await req.pool.query(query);

     
        const contestsWithStatus = result.rows.map(contest => {
 
            const contestStartDate = new Date(contest.start_date);
            const contestEndDate = new Date(contest.end_date);

            let status = 'Upcoming'; 

            if (contestEndDate < currentDate) {
                status = 'Ended';  
            } else if (contestStartDate <= currentDate && contestEndDate >= currentDate) {
                status = 'Ongoing'; 
            }

            return {
                ...contest,
                status,  
            };
        });

        res.status(200).json({
            success: true,
            contests: contestsWithStatus,
        });
    } catch (error) {
        console.error('Error fetching all contests:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

module.exports = router    

