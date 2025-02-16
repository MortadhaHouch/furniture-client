import React from 'react'
import { NavigationMenu } from './NavigationMenu'
import Link from 'next/link'
import Image from 'next/image'
import { ModeToggle } from './ModeToggle'

export default function Header() {
  return (
    <header className='w-screen flex flex-row justify-between items-center p-2 fixed top-0 left-0 backdrop-blur-lg z-50'>
      <div className='flex flex-row justify-center items-center gap-1'>
        <Image src="/assets/images/logo.png" className='bg-slate-900 rounded-full w-[50px] h-[50px]' alt="" width={100} height={100}/>
        <h1>
          <Link href={"/"}><span className='text-1xl font-bold md:text-2xl lg:text-3xl'>prestige déco</span></Link>
        </h1>
      </div>
        <NavigationMenu/>
      <ModeToggle />
    </header>
  )
}
