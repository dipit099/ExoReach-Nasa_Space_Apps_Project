// firebaseConfig.js
const firebase = require('firebase/app');
const { getStorage } = require('firebase/storage');


const firebaseConfig = {
    apiKey: "AIzaSyBfOZO4aXFMAlbLPd8-ERILUpwkjIVpFG8",
    authDomain: "exoreach-e8718.firebaseapp.com",
    projectId: "exoreach-e8718",
    storageBucket: "exoreach-e8718.appspot.com",
    messagingSenderId: "337503381719",
    appId: "1:337503381719:web:9125eef62c3e04db102892",
    measurementId: "G-VERJ2WLW0B"
  };

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

module.exports = { storage };