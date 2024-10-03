const express = require('express');
const router = express.Router();

router.post('/details', async (req, res) => {
    const { forumId } = req.body;  

    if (!forumId) {
        return res.status(400).json({ success: false, message: 'Missing required forumId' });
    }
    
});

module.exports = router;
