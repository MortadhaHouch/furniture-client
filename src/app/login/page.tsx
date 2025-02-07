"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { useState } from 'react'
import LoginImage from "../../../public/assets/icons/login.svg"
import { emailRegex } from '../../../utils/types'
import { CiLogin } from "react-icons/ci";
import Link from 'next/link'
import {motion}  from "framer-motion"
export default function Login() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    return (
        <main className='w-full min-h-screen flex flex-row justify-center items-center flex-wrap'>
            <motion.div 
                initial='initial'
                className='w-[clamp(300px,40%,450px)]'
                variants={{
                    initial: { opacity: 0, x: -70 },
                }}
                whileInView={{
                    opacity: 1,
                    x: 0
                }}
                transition={{
                    duration: 0.3,
                    type: 'tween',
                    ease:"easeInOut"
                }}
            >
                <Image src={LoginImage} alt=''width={300} height={300} className='w-full aspect-square' priority/>
            </motion.div>
            <motion.form 
                className='w-[clamp(300px,40%,450px)] flex flex-col justify-center items-center gap-2 border shadow-md p-2 rounded-md'
                initial='initial'
                variants={{
                    initial: { opacity: 0, x: 70 },
                }}
                whileInView={{
                    opacity: 1,
                    x: 0
                }}
                transition={{
                    duration: 0.3,
                    type: 'tween',
                    ease:"easeInOut"
                }}
            >
                <h2 className='w-full text-center text-xl md:text-2xl lg:text-3xl'>
                    login
                </h2>
                <div className='w-full flex flex-col justify-start items-start gap-1'>
                    <label htmlFor="email">email:</label>
                    <Input required type='email' value={email} className={`border ${email.trim().length > 0 && !email.trim().match(emailRegex) && 'block'}`} onChange={(e)=>setEmail(e.target.value)}/>
                    <p className={`text-red-600 hidden ${email.trim().length > 0 && !email.trim().match(emailRegex) && 'block'}`}>Invalid email</p>
                </div>
                <div className='w-full flex flex-col justify-start items-start gap-1'>
                    <label htmlFor="password">password:</label>
                    <Input required type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <Button className='w-full flex flex-row justify-center items-center gap-1' disabled={email.length == 0 || !email.trim().match(emailRegex) || password.length == 0}><CiLogin /><span>Login</span></Button>
                <p className='w-full'>
                    You don&apos;t have and account
                </p>
                <Button className='w-full' type='button'>
                    <Link href="/signup">create an account</Link>
                </Button>
            </motion.form>
        </main>
    )
}
