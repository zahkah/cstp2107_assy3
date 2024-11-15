// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';






// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCauhmowIGr6u2qil10JOAa3q5ZIOO_7SE",
  authDomain: "blogapplication-b12be.firebaseapp.com",
  projectId: "blogapplication-b12be",
  storageBucket: "blogapplication-b12be.firebasestorage.app",
  messagingSenderId: "175915429710",
  appId: "1:175915429710:web:3f4349df262f679e72f81f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const db = getFirestore(app);

export {auth, db};

//export const db = getFirestore(app);
