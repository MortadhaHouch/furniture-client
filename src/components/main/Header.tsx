import React from 'react'
import { NavigationMenu } from './NavigationMenu'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='w-screen flex flex-row justify-between items-center p-2 fixed top-0 left-0 backdrop-blur-lg z-50'>
        <h1>
            <Link href={"/"}><span className='text-3xl font-bold'>prestige déco</span></Link>
        </h1>
        <NavigationMenu/>
        <ModeToggle/>
    </header>
  )
}
