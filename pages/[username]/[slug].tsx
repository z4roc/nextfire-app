import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import Link from "next/link";
import AuthCheck from "../../components/AuthCheck";
import HeartButton from "../../components/HeartButton";
import PostContent from "../../components/PostContent";
import { firestore, getUserWithUsername, postToJson } from "../../lib/firebase";
import { useDocumentData } from "../../lib/hooks";

import styles from "../../styles/Post.module.css";

export async function getStaticProps({ params }) {
  const { username, slug } = params;

  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = doc(firestore, userDoc.ref.path, "posts", slug);
    post = postToJson(await getDoc(postRef));
    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const q = query(collectionGroup(firestore, "posts"), limit(20));
  const snapshot = await getDocs(q);

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export default function PostPage(props) {
  const postRef = doc(firestore, props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>
      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>Sign up to ❤</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>
      </aside>
    </main>
  );
}
