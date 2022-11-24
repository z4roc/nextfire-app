import { collection, doc, orderBy, query, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import AuthCheck from "../../components/AuthCheck";
import PostFeed from "../../components/PostFeed";
import { UserContext } from "../../lib/context";
import { auth, firestore } from "../../lib/firebase";
import { useCollection } from "../../lib/hooks";

import styles from "../../styles/Admin.module.css";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";

export default function AdminPage(props) {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}

function PostList(): JSX.Element {
  const ref = collection(firestore, "users", auth?.currentUser?.uid, "posts");
  const postQuery = query(ref, orderBy("createdAt"));

  const [querysnapshot] = useCollection(postQuery);

  const posts = querysnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost(): JSX.Element {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("second");

  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;


  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;

    const ref = doc(firestore, 'users', uid, 'posts', slug);
    
    const data = {
        title,
        slug,
        uid,
        username,
        published: false,
        content: 'Hello world!',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        heartCount: 0
    }

    await setDoc(ref, data);

    toast.success('Post created!');

    router.push(`/admin/${slug}`)
  }

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Create an awesome article!"
        className={styles.input}
      />
        <p>
            <strong>Slug: </strong> {slug}
        </p>
        <button type="submit" disabled={!isValid} className="btn-green">
            Create post
        </button>

    </form>
  );
}
