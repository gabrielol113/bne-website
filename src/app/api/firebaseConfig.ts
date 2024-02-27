
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCAEZRqec9xVhu7dbWKEKtwrUbIQwFEwA",
  authDomain: "bne-website-fcb93.firebaseapp.com",
  projectId: "bne-website-fcb93",
  storageBucket: "bne-website-fcb93.appspot.com",
  messagingSenderId: "251328685130",
  appId: "1:251328685130:web:c2441007cf340b004b32b3",
  databaseUrl: "https://bne-website-fcb93-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


