import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE_API_KEY,
    authDomain: "nam-hoa-2c173.firebaseapp.com",
    projectId: "nam-hoa-2c173",
    storageBucket: "nam-hoa-2c173.appspot.com",
    messagingSenderId: "933598641096",
    appId: "1:933598641096:web:d5a73c7d8eaaacdb869efd",
    measurementId: "G-GGVFPWK8GT"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore();

  export default db;