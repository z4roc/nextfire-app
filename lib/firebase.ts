// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAAx-lUNDGCp1BjCxgfE9eqf9DyCyoJxQ",
  authDomain: "nextfire-course-e15dc.firebaseapp.com",
  projectId: "nextfire-course-e15dc",
  storageBucket: "nextfire-course-e15dc.appspot.com",
  messagingSenderId: "928881261138",
  appId: "1:928881261138:web:553ed74fae6017edddfd8b",
  measurementId: "G-YMR468WVDL"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const storage = getStorage(app);
