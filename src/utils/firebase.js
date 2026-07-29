// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYtDYDdgXyj3_l6Qv0sWzhya0Hq7H7eIM",
  authDomain: "movie-orbit-7a4b8.firebaseapp.com",
  projectId: "movie-orbit-7a4b8",
  storageBucket: "movie-orbit-7a4b8.firebasestorage.app",
  messagingSenderId: "655260183203",
  appId: "1:655260183203:web:46cb16186aa995fba46d16",
  measurementId: "G-2S1ZRS9J5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);