import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAMFgiTvfCmXrROgNGizeyV0bJ7QKIUFCM",
    authDomain: "covid-19-tracker-eb1dd.firebaseapp.com",
    projectId: "covid-19-tracker-eb1dd",
    storageBucket: "covid-19-tracker-eb1dd.appspot.com",
    messagingSenderId: "413080099856",
    appId: "1:413080099856:web:d978bf4de824a981febe95"
  };
  firebase.initializeApp(firebaseConfig);

  




  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const signInWithGoogle = async () => {
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };