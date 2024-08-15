// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkveSlptLSEvmJQ1H6kLBwLuztKAnFr5Y",
  authDomain: "akhil-app-f23a1.firebaseapp.com",
  projectId: "akhil-app-f23a1",
  storageBucket: "akhil-app-f23a1.appspot.com",
  messagingSenderId: "803448194812",
  appId: "1:803448194812:web:e75aa30c51e51056d9f979",
  measurementId: "G-8YVRT365QC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
