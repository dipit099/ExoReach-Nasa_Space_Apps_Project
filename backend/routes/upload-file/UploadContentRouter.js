const express = require('express');
const multer = require('multer');
const firebaseAdmin = require('firebase-admin');
const { ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');
const path = require('path');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
  storageBucket: 'exoreach-e8718.appspot.com'
});
const storage = firebaseAdmin.storage().bucket();

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/content-pic', upload.single('content_pic'), async (req, res) => {
  const { contentId, userId } = req.body;

  if (!contentId || !userId || !req.file) {
    return res.status(400).json({ success: false, message: 'Content ID, User ID, or file missing' });
  }

  try {

    const currentDate = new Date().toISOString().split('T')[0];

    const filePath = `content-uploads/${userId}/${userId + "_" +  currentDate}`;
    const storageRef = ref(storage, filePath);
    
    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    const query = `
      UPDATE content
      SET content_pic = $1
      WHERE content_id = $2
    `;
    await req.pool.query(query, [downloadURL, contentId]);

    res.status(200).json({ success: true, contentPicUrl: downloadURL });

  } catch (error) {
    console.error('Error uploading content picture:', error);
    res.status(500).json({ success: false, message: 'Error uploading file' });
  }
});

module.exports = router;
