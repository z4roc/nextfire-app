import Head from 'next/head'
import React from 'react'

export default function Metatags({ title, description, image }) {

  return (
    <Head>
      <title>{title}</title>
      <meta name='twitter:card' content='summary'/>
      <meta name='twitter:site' content='@turbointerl9'/>
      <meta name='twitter:title' content={title}/>
      <meta name='twitter:description' content={description}/>
      <meta name='twitter:image' content={image}/>
    </Head>
  )
}
