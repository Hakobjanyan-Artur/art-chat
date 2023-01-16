// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcavQtVolDbJV3X_5e3nXVGJ1lVTPYB7Q",
  authDomain: "artchat-86d4b.firebaseapp.com",
  projectId: "artchat-86d4b",
  storageBucket: "artchat-86d4b.appspot.com",
  messagingSenderId: "917142935201",
  appId: "1:917142935201:web:487c62ab4e5e2562b042e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)