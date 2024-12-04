// Firebase Configuration: src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVkysA2-ql826eNNvW6LF9AqRPlxcOHxg",
  authDomain: "plants-dcdde.firebaseapp.com",
  projectId: "plants-dcdde",
  storageBucket: "plants-dcdde.firebasestorage.app",
  messagingSenderId: "514416448572",
  appId: "1:514416448572:web:18a64722711d79c65c9f39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
