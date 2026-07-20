import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace these values with your actual Firebase project credentials later
const firebaseConfig = {
  apiKey: "AIzaSyDy9C3j4k0PIW_x9VSzRxHYf8IIgPKQeNY",
  authDomain: "nexora-arts.firebaseapp.com",
  projectId: "nexora-arts",
  storageBucket: "nexora-arts.firebasestorage.app",
  messagingSenderId: "989179902273",
  appId: "1:989179902273:web:d700845b816ab974f289c0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);