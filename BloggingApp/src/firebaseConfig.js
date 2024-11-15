// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACFknMbTmzA0AKScUDwPrmYuRFmEHAE70",
  authDomain: "myfirebaseproject2024.firebaseapp.com",
  projectId: "myfirebaseproject2024",
  storageBucket: "myfirebaseproject2024.firebasestorage.app",
  messagingSenderId: "282014307083",
  appId: "1:282014307083:web:66748a5b2ef0e7610dc80e",
  measurementId: "G-3PPQTG0J00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app};

export const db = getFirestore(app);
