import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDKWKyswC3e-Ei0l8puzxE6FddgIXeCXwc",
    authDomain: "fullstack-411c9.firebaseapp.com",
    projectId: "fullstack-411c9",
    storageBucket: "fullstack-411c9.appspot.com",
    messagingSenderId: "936862798756",
    appId: "1:936862798756:web:3c664f1d98877128bea731"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase