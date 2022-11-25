import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { auth, STATE_CHANGED, storage } from "../lib/firebase";
import Loader from "./Loader";

export default function ImageUpload() {
  const [updloading, setupdloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  const uploadFile = async (e: any) => {
    const file = Array.from(e.target.files)[0] as Blob;
    const extension = file.type.split("/")[1];

    const uid: any = auth.currentUser.uid;

    const fileRef = ref(storage, `uploads/${uid}/${Date.now()}.${extension}`);

    setupdloading(true);

    const task = uploadBytesResumable(fileRef, file);

    task.on(STATE_CHANGED, (snapshot) => {
      const pct: any = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(pct);
    });

    task
      .then(() => getDownloadURL(fileRef))
      .then((url: any) => {
        setDownloadURL(url);
        setupdloading(false);
        console.log(downloadURL);
      });
  };

  return (
    <div className="box">
      <Loader show={updloading} />
      {updloading && <h3>{progress}%</h3>}
      {!updloading && (
        <>
          <label className="btn">
            📸 Uplaod image
            <input type="file" onChange={uploadFile} />
          </label>
        </>
      )}

      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
}
