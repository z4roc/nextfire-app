import React from "react";
import PropTypes from "prop-types";
import { collection, doc, increment, writeBatch } from "firebase/firestore";
import { auth, firestore } from "../lib/firebase";
import { useDocument } from "../lib/hooks";

function HeartButton({ postRef }) {
  const uid: any = auth.currentUser.uid;
  const heartRef = doc(firestore, postRef.path, "hearts", uid);

  const [heartDoc] = useDocument(heartRef);

  const removeHeart = async () => {
    const batch = writeBatch(firestore);

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  const addHeart = async () => {
    const batch = writeBatch(firestore);

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  return heartDoc?.exists() ? (
    <button onClick={removeHeart} className="btn-blue">
      unlike 💔
    </button>
  ) : (
    <button onClick={addHeart} className="btn-blue">
      Like ❤
    </button>
  );
}

export default HeartButton;
