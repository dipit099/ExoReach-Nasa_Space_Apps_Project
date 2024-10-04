const express = require('express');
const multer = require('multer');
const { getDownloadURL, uploadBytesResumable, ref } = require('firebase/storage');
const { storage } = require('../../config/firebaseConfig');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/user-profile-pic', upload.single('profilePic'), async (req, res) => {
  const { userId } = req.body;
  
  if (!userId || !req.file) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const filePath = `profile-pic-uploads/${userId + " " + currentDate}`;
  
    const storageRef = ref(storage, filePath);
    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Profile picture URL:', downloadURL);

    const query = `
      UPDATE users
      SET profile_pic = $1
      WHERE user_id = $2
    `;
    await req.pool.query(query, [downloadURL, userId]);
    return res.status(200).json({
      success: true,
      message: 'Profile picture uploaded successfully',
      profilePicUrl: downloadURL
    });

  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
