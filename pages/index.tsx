import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import Loader from '../components/Loader'

import toast from 'react-hot-toast'
import { collectionGroup, getDocs, limit, orderBy, query, startAfter, Timestamp, where } from 'firebase/firestore'
import { firestore, postToJson } from '../lib/firebase'
import { useState } from 'react'
import PostFeed from '../components/PostFeed'
import { GetServerSideProps } from 'next'

const LIMIT = 1;

export const getServerSideProps:  GetServerSideProps = async () => {
  const postsrf = collectionGroup(firestore, 'posts');
  const postqry = query(
    postsrf, 
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT)
  );

  const posts = (await getDocs(postqry)).docs.map(postToJson);
  return {
    props: { posts }
  };
}

export default function Home( props ) {
  const [posts, SetPosts] = useState(props.posts);
  const [loading, setloading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setloading(true);
    const last = posts[posts.length - 1];

    const cursor = last && last.createdAt ? typeof last.createdAt === 'number' ? Timestamp.fromMillis(last.createdAt) : last.createdAt : null;
    const ref = collectionGroup(firestore, 'posts'); 
    const postsQuery = query(
      ref,
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT),
    );
      
    const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());
  
    SetPosts(posts.concat(newPosts));
    setloading(false);

    if(newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <PostFeed posts={posts}/>

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading}/>
      {postsEnd && 'You have reached the end!'}
    </main>
  )
}
