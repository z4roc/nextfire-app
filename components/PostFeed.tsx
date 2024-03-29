import React from "react";
import Link from "next/link";

export default function PostFeed({ posts, admin = false }) {
  return posts && posts.length ? (
    posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />)
  ) : (
    <></>
  );
}

function PostItem({ post, admin }) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <strong>By @{post.username}</strong>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>

      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span className="push-left">💓 {post.heartCount} Hearts</span>

        {admin && (
          <>
            <Link passHref href={`/admin/${post.slug}`}>
              <h3>
                <button className="btn-blue">Edit post</button>
              </h3>
            </Link>

            {post.published ? (
              <p className="text-success">Live</p>
            ) : (
              <p className="text-danger">Unpublished</p>
            )}
          </>
        )}
      </footer>
    </div>
  );
}
