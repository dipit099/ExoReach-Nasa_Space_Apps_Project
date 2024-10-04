const express = require("express");
const router = express.Router();
const multer = require('multer');
const { getDownloadURL, uploadBytesResumable, ref } = require('firebase/storage');
const { storage } = require('../../config/firebaseConfig');
const cors = require("cors");
const path = require('path');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('contentPic'), async (req, res) => {
  const { userId, caption, description, contestId } = req.body;

  if (!userId || !caption || !description || !req.file || !contestId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const filePath = `uploads/${userId}_${currentDate}`;
    
      const storageRef = ref(storage, filePath);
      const metadata = {
          contentType: req.file.mimetype,
      };
      
    const snapshot = await uploadBytesResumable(storageRef,metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    const contentResult = await req.pool.query(
      'INSERT INTO content (user_id, caption, description, url_for_content) VALUES ($1, $2, $3, $4) RETURNING id',
      [userId, caption, description, downloadURL]
    );

    const newContentId = contentResult.rows[0].id;

    await req.pool.query(
      'INSERT INTO content_in_contest (content_id, contest_id) VALUES ($1, $2)',
      [newContentId, contestId]
    );

    return res.status(201).json({
      success: true,
      message: 'Content created successfully and added to contest',
      contentId: newContentId,
      contentPicUrl: downloadURL
    });

  } catch (error) {
    console.error('Error uploading content:', error);
    return res.status(500).json({ message: 'Internal server error' });
  
  }
});

module.exports = router;
