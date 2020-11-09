import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDKHR6jzBYbAnfIXHh8yHVfWe6Qw0OnYkk",
  authDomain: "react-telegram-f528e.firebaseapp.com",
  databaseURL: "https://react-telegram-f528e.firebaseio.com",
  projectId: "react-telegram-f528e",
  storageBucket: "react-telegram-f528e.appspot.com",
  messagingSenderId: "371651902091",
  appId: "1:371651902091:web:d1e04a2d7231bceee1728e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
