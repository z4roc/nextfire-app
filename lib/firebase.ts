
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCAAx-lUNDGCp1BjCxgfE9eqf9DyCyoJxQ",
  authDomain: "nextfire-course-e15dc.firebaseapp.com",
  projectId: "nextfire-course-e15dc",
  storageBucket: "nextfire-course-e15dc.appspot.com",
  messagingSenderId: "928881261138",
  appId: "1:928881261138:web:553ed74fae6017edddfd8b",
  measurementId: "G-YMR468WVDL"
};

const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export const firebaseold = firebase;
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const storage = getStorage(app);

