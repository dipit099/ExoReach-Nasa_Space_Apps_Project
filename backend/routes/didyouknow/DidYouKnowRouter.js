const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const query = `
      SELECT * FROM did_you_know
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    const result = await req.pool.query(query);
    
    if (result.rows.length > 0) {
      return res.status(200).json({ success: true, fact: result.rows[0] });
    } else {
      return res.status(404).json({ success: false, message: 'No facts available' });
    }
  } catch (error) {
    console.error('Error fetching random fact:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
