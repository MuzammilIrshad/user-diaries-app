
import  firebase from 'firebase';
import "firebase/auth";

var app = firebase.initializeApp({
    apiKey: "AIzaSyB6VNrzhSHhRHM2Wy2dfeImaBr_Tsul3JM",
    authDomain: "diaries-app-38674.firebaseapp.com",
    projectId: "diaries-app-38674",
    storageBucket: "diaries-app-38674.appspot.com",
    messagingSenderId: "235872909086",
    appId: "1:235872909086:web:d69768dba43d13c5e3fb0f",
    measurementId: "G-LZ706ZLKW5"
  });
  // Initialize Firebase
 export const auth = app.auth();
export default app;