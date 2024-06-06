// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSdzd1yjVGVZ2kuc-8EGfP1If1NWiKKco",
  authDomain: "todoapp-391b0.firebaseapp.com",
  projectId: "todoapp-391b0",
  storageBucket: "todoapp-391b0.appspot.com",
  messagingSenderId: "530483623198",
  appId: "1:530483623198:web:84ab942e9aa12bb358050f",
  measurementId: "G-8XKCDMZVCC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);