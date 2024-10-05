const express = require('express');
const multer = require('multer');
const firebaseAdmin = require('firebase-admin');
const path = require('path');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
  storageBucket: 'exoreach-e8718.appspot.com'
});
const storage = firebaseAdmin.storage().bucket();

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/', upload.single('contentPic'), async (req, res) => {
  const { userId, caption, description, contestId } = req.body;

  if (!userId || !caption || !description || !req.file || !contestId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const filePath = `content-uploads/${userId}/${userId}_${currentDate}_${req.file.originalname}`;

    const fileUpload = storage.file(filePath);

    await fileUpload.save(req.file.buffer, {
      metadata: { contentType: req.file.mimetype }
    });

    const downloadURL = `https://storage.googleapis.com/${storage.name}/${fileUpload.name}`;

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
