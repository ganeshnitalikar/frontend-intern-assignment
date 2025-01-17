import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBzIlfjjzClwOdMx9atiegw9h84RRnYV00",
  authDomain: "project-65234.firebaseapp.com",
  projectId: "project-65234",
  storageBucket: "project-65234.firebasestorage.app",
  messagingSenderId: "279321331796",
  appId: "1:279321331796:web:c29693b47b7528416cc5c1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
