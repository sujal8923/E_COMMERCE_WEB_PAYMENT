// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Use the full auth import (not 'cordova')
import { getFirestore } from "firebase/firestore"; // Use full Firestore SDK

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArvaXvciObRN8MPCbglhUu2Fb3pQr3v0U",
  authDomain: "ecommerceapp-cfb49.firebaseapp.com",
  projectId: "ecommerceapp-cfb49",
  storageBucket: "ecommerceapp-cfb49.firebasestorage.app",
  messagingSenderId: "516963513665",
  appId: "1:516963513665:web:8c3b170f1ca79b85415dc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (full SDK)
const fireDB = getFirestore(app);

// Initialize Auth (full SDK)
export const auth = getAuth(app);

export { app, fireDB };
