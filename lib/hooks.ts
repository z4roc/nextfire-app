import { doc, DocumentData, DocumentReference, onSnapshot, Query, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect( () => {
    let unsubscribe;
    
    if(user) {
      const ref = doc(firestore, `users/${user.uid}`);
      
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      });
      
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user])
  return { user, username }
}

export function useDocument(ref: DocumentReference): (QueryDocumentSnapshot | null)[] {
  const [_doc, _setDoc] = useState<QueryDocumentSnapshot | null>(null);

  const docRef = useRef(ref);

  useEffect(() => {
      return onSnapshot(docRef.current, (snap) => {
          _setDoc(snap.exists() ? snap : null);
      });
  }, [docRef]);
  return [_doc];
}

export function useDocumentData(ref: DocumentReference): (DocumentData | null)[] {
  const [_doc, setDoc] = useState<DocumentData | null>(null);

  const docRef = useRef(ref);

  useEffect(() => {
      return onSnapshot(docRef.current, (snap) => {
          setDoc(snap.exists() ? snap.data() : null);
      });
  }, [docRef]);
  return [_doc];
}

export function useCollection(ref: Query): (QuerySnapshot<DocumentData> | null)[] {
  const [_col, setCol] = useState<QuerySnapshot | null>(null);

  const colRef = useRef(ref);

  useEffect(() => {
      return onSnapshot(colRef.current, (snap) => {
          setCol(!snap.empty ? snap : null);
      });
  }, [colRef]);
  return [_col];
}
