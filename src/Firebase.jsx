import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRcI7f2DZXiBTtqy4NPxApm5FiZKMmSeI",
  authDomain: "ukm-musik-uad.firebaseapp.com",
  projectId: "ukm-musik-uad",
  storageBucket: "ukm-musik-uad.firebasestorage.app",
  messagingSenderId: "237977257265",
  appId: "1:237977257265:web:75016fd91bd1b0ff3b1c10",
  measurementId: "G-CHFJ2HRFNT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; // Pastikan db diekspor