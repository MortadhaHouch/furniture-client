"use client"
import { useParams } from 'next/navigation'
import React from 'react'

export default function Slug() {
    const slug = useParams()
    console.log(slug);
    return (
      <main className='w-full min-h-screen flex flex-col justify-start items-center flex-wrap pt-28'>
        <h1 className="text-4xl font-bold">{slug.slug}</h1>
      </main>
    )
}
