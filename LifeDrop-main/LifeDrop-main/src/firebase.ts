// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxzQ-Zb7nj0Xwjyt3s80jTkaRnunO_aBg",
  authDomain: "lifedrop-f86f5.firebaseapp.com",
  projectId: "lifedrop-f86f5",
  storageBucket: "lifedrop-f86f5.appspot.com",
  messagingSenderId: "750516036097",
  appId: "1:750516036097:web:76ec513fd814a180f4d600",
  measurementId: "G-KTR54D6VWG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Get Firestore and Auth instances
export const db = getFirestore(app);
export const auth = getAuth(app);