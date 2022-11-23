import React from 'react'

export default function UserProfile({ user }) {
  return (
    <div className='box-center'>
      <img src={user.photoURL} className="card-img-center"> </img>
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  )
}
