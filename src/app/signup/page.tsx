"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { useState } from 'react'
import SignupImage from "../../../public/assets/icons/sign-up.svg"
import Link from 'next/link'
import {motion}  from "framer-motion"
import { emailRegex } from '../../../utils/types'

export default function Signup() {
    const  [firstName,setFirstName] = useState("")
    const  [lastName,setLastName] = useState("")
    const  [email,setEmail] = useState("")
    const  [password,setPassword] = useState("")
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
                }}>
                <Image src={SignupImage} alt='' width={300} height={300} className='w-full aspect-square' priority/>
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
                        sign up
                    </h2>
                    <div className='w-full flex flex-col justify-start items-start gap-1'>   
                        <label htmlFor="first-name">first name:</label>
                        <Input onChange={(e)=>setFirstName(e.target.value)} value={firstName} required name='first-name' type='text'/>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start gap-1'>
                        <label htmlFor="last-name">last name:</label>
                        <Input onChange={(e)=>setLastName(e.target.value)} value={lastName} required type='text'/>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start gap-1'>
                        <label htmlFor="email">email:</label>
                        <Input onChange={(e)=>setEmail(e.target.value)} value={email} required type='email'/>
                        <p className={`text-red-600 hidden ${email.trim().length > 0 && !email.trim().match(emailRegex) && 'block'}`}>Invalid email</p>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start gap-1'>
                        <label htmlFor="password">password:</label>
                        <Input onChange={(e)=>setPassword(e.target.value)} value={password} required type='password'/>
                    </div>
                    <Button className='w-full' disabled={firstName.length == 0 || lastName.length == 0 || email.length == 0 || !email.trim().match(emailRegex) || password.length == 0} >signup</Button>
                    <p className='w-full'>
                        Already have an account?
                    </p>
                    <Button type='button' className='w-full'>
                        <Link href="/login">
                            Login
                        </Link>
                    </Button>
                </motion.form>
        </main>
    )
}
