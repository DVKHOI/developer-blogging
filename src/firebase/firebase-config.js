import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB4tOjOXCIKM0GJlYLlJU2jGgKYGKPccNw",
  authDomain: "developer-way.firebaseapp.com",
  projectId: "developer-way",
  storageBucket: "developer-way.appspot.com",
  messagingSenderId: "334258162447",
  appId: "1:334258162447:web:a650098d1d5f2266a58c7a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
