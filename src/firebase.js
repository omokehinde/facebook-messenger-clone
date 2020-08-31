import firebase from "firebase";

const firebaseApp = firebase.initializeApp({ 
    apiKey: "AIzaSyCgBqwJdjRXTJFP_LNkThUgsNqUR-aWx3Y",
    authDomain: "facebook-messenger-clone-b87ed.firebaseapp.com",
    databaseURL: "https://facebook-messenger-clone-b87ed.firebaseio.com",
    projectId: "facebook-messenger-clone-b87ed",
    storageBucket: "facebook-messenger-clone-b87ed.appspot.com",
    messagingSenderId: "228911628822",
    appId: "1:228911628822:web:e17f2d1dc101dcdef4ab37",
    measurementId: "G-LLZNY346GW"
 });

 const db = firebaseApp.firestore();
 export default db;