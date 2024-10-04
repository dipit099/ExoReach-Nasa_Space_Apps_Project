const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { contestId } = req.body;

    if (!contestId) {
        return res.status(400).json({ success: false, message: 'Contest ID is required' });
    }

    try {

        const contestQuery = `
            SELECT
                c.contest_id AS "contestId",
                c.caption AS "contestCaption",
                c.description AS "contestDescription",
                c.start_date AS "contestStartDate",
                c.end_date AS "contestEndDate",
                CASE
                    WHEN c.end_date < CURRENT_DATE THEN 'Past'
                    WHEN c.start_date > CURRENT_DATE THEN 'Upcoming'
                    ELSE 'Ongoing'
                END AS "contestStatus"
            FROM contest c
            WHERE c.contest_id = $1;
        `;

        const contestResult = await req.pool.query(contestQuery, [contestId]);

        if (contestResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Contest not found' });
        }

        const contestDetails = contestResult.rows[0]; 
        const contentQuery = `
            SELECT
                con.id AS "contentId",
                con.user_id AS "userId",
                con.caption AS "contentCaption",
                con.description AS "contentDescription",
                con.url_for_content AS "contentUrl",
                u.username AS "userName",
                u.profile_pic AS "userProfilePic",
                cic.registered_in_contest AS "registrationDate",
                COUNT(up.user_id) AS "upvoteCount"
            FROM content_in_contest cic
            JOIN content con ON con.id = cic.content_id
            JOIN public.users u ON u.id = con.user_id
            LEFT JOIN upvotes up ON up.content_id = con.id AND up.contest_id = $1
            WHERE cic.contest_id = $1
            GROUP BY con.id, u.id, cic.registered_in_contest
            ORDER BY cic.registered_in_contest DESC;
        `;

        const contentResult = await req.pool.query(contentQuery, [contestId]);
        const response = {
            success: true,
            contestDetails: contestDetails,
            contentDetails: contentResult.rows 
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error retrieving contest contents:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
