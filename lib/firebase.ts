import { FirebaseOptions, getApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  DocumentSnapshot,
  increment,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";
import { getStorage, TaskEvent } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAAx-lUNDGCp1BjCxgfE9eqf9DyCyoJxQ",
  authDomain: "nextfire-course-e15dc.firebaseapp.com",
  projectId: "nextfire-course-e15dc",
  storageBucket: "nextfire-course-e15dc.appspot.com",
  messagingSenderId: "928881261138",
  appId: "1:928881261138:web:553ed74fae6017edddfd8b",
  measurementId: "G-YMR468WVDL",
};

const app = createFirebaseApp(firebaseConfig);

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

export const firebaseold = firebase;
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export const STATE_CHANGED = "state_changed";

export async function getUserWithUsername(username: string) {
  const q = query(
    collection(firestore, "users"),
    where("username", "==", username),
    limit(1)
  );
  return (await getDocs(q)).docs[0];
}

export function postToJson(doc: DocumentSnapshot) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
