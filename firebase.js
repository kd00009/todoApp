// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSdzd1yjVGVZ2kuc-8EGfP1If1NWiKKco",
  authDomain: "todoapp-391b0.firebaseapp.com",
  projectId: "todoapp-391b0",
  storageBucket: "todoapp-391b0.appspot.com",
  messagingSenderId: "530483623198",
  appId: "1:530483623198:web:84ab942e9aa12bb358050f",
  measurementId: "G-8XKCDMZVCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);