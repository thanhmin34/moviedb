import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBadOeDL8iAqi-GHK4T0FI5jWgUfXznN5I",
  authDomain: "movies-c1aa7.firebaseapp.com",
  projectId: "movies-c1aa7",
  storageBucket: "movies-c1aa7.appspot.com",
  messagingSenderId: "282828257849",
  appId: "1:282828257849:web:dfeb01a4042a6b2ece2be8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
