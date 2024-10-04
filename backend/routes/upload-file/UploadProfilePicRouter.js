const express = require('express');
const multer = require('multer');
const firebaseAdmin = require('firebase-admin');
const { ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
  storageBucket: 'exoreach-e8718.appspot.com'
});
const storage = firebaseAdmin.storage().bucket();

const upload = multer({ storage: multer.memoryStorage() }); 

const router = express.Router();

router.post('/user-profile-pic', upload.single('profile_pic'), async (req, res) => {
  const { userId } = req.body;

  if (!userId || !req.file) {
    return res.status(400).json({ success: false, message: 'User ID or file missing' });
  }

  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const filePath = `profile-pic-uploads/${userId + "_" +  currentDate}`;
    const storageRef = ref(storage, filePath);
    
    const metadata = {
      contentType: req.file.mimetype,
    };
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

    const downloadURL = await getDownloadURL(snapshot.ref);
    const query = `
      UPDATE users
      SET profile_pic = $1
      WHERE user_id = $2
    `;
    await req.pool.query(query, [downloadURL, userId]);

    res.status(200).json({ success: true, profilePicUrl: downloadURL });

  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ success: false, message: 'Error uploading file' });
  }
});

module.exports = router;
