"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { FormEvent, useContext, useRef, useState } from 'react'
import SignupImage from "../../../public/assets/icons/sign-up.svg"
import Link from 'next/link'
import {motion}  from "framer-motion"
import { AuthErrorType, emailRegex, LoadingProps, passwordRegex } from '../../../utils/types'
import fetchData from '../../../utils/fetchData'
import { useCookies } from 'react-cookie'
import { AuthContext } from '@/providers/AuthContext'
import { redirect } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import Loader from '@/components/main/Loader'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { FaXmark } from 'react-icons/fa6'
import sign from "jwt-encode"
export default function Signup() {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [,setCookie] = useCookies(["auth_token"])
    const [error,setError] = useState<AuthErrorType|null>(null);
    const formRef = useRef<HTMLFormElement|null>(null)
    const {isLogged,setIsLoggedIn} = useContext(AuthContext);
    function checkCredentialsValidity(){
        return firstName.length == 0 || lastName.length == 0 || email.length == 0 || !email.trim().match(emailRegex) || password.length == 0 || !password.trim().match(passwordRegex.lowercase) || !password.trim().match(passwordRegex.uppercase) || !password.trim().match(passwordRegex.specialChars) || !password.trim().match(passwordRegex.numbers)
    }
    async function handleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            const request = await fetchData("/user/signup","POST",{
                email:email.trim(),
                password:password.trim(),
                firstName:firstName.trim(),
                lastName:lastName.trim()
            },setIsLoading,"")
            setError(null);
            if(request.isVerified){
                const {email,firstName,lastName} = jwtDecode(request.token) as {email:string,firstName:string,lastName:string};
                setCookie("auth_token",
                    sign({
                        email,
                        firstName,
                        lastName
                    },
                    process.env.NEXT_PUBLIC_SECRET_KEY as string),{
                    path:"/",
                    maxAge:60*60*24*7,
                    expires: new Date(Date.now() + 60*60*24*7)
                })
                setIsLoggedIn(true);
                localStorage.setItem("email",email);
                localStorage.setItem("firstName",firstName);
                localStorage.setItem("lastName",lastName);
                localStorage.setItem("isLoggedIn",JSON.stringify(isLogged));
                redirect("/dashboard");
            }
            if(request.user_error){
                setError(AuthErrorType.USER_ERROR);
            }
            if(request.field_error){
                setError(AuthErrorType.CRED_ERROR);
            }
        } catch (error) {
            console.log(error);
        }finally{
            formRef.current?.reset();
        }
    }
    return (
        <main className='w-full min-h-screen flex flex-col justify-center items-center flex-wrap pt-28'>
            <div className="w-full flex flex-row justify-center items-center gap-2 flex-wrap">
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
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className='w-[clamp(300px,40%,450px)] flex flex-col justify-center items-center gap-2 border shadow-md p-4 rounded-md'
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
                            <p className={`${firstName.trim().length > 0?'hidden':'block'} text-red-500`}>
                                First name is required
                            </p>
                        </div>
                        <div className='w-full flex flex-col justify-start items-start gap-1'>
                            <label htmlFor="last-name">last name:</label>
                            <Input onChange={(e)=>setLastName(e.target.value)} value={lastName} required type='text'/>
                            <p className={`${lastName.trim().length > 0?'hidden':'block'} text-red-500`}>
                                Last name is required
                            </p>
                        </div>
                        <div className='w-full flex flex-col justify-start items-start gap-1'>
                            <label htmlFor="email">email:</label>
                            <Input onChange={(e)=>setEmail(e.target.value)} value={email} required type='email'/>
                            <p className={`${emailRegex.test(email.trim()) ? 'text-green-500' : 'text-red-500'} ${email.length > 0?'block':'hidden'}`}>
                                Invalid email
                            </p>
                        </div>
                        <div className='w-full flex flex-col justify-start items-start gap-1'>
                            <label htmlFor="password">password:</label>
                            <Input onChange={(e)=>setPassword(e.target.value)} value={password} required type='password'/>
                            <ul className='flex flex-col justify-start items-start gap-2'>
                                <li className={`flex flex-row justify-start items-start gap-2 ${password.length >= 8 ? 'text-green-500' : 'text-red-500'} ${password.length > 0?'block':'hidden'}`}>
                                    {password.length >= 8?<IoMdCheckmarkCircleOutline size={20} color='green'/>:<FaXmark color='red' size={20} />}{" "}<span>Le mot de passe doit contenir au moins 8 caractères</span>
                                </li>
                                <li className={`flex flex-row justify-start items-start gap-2 ${passwordRegex.uppercase.test(password) ? 'text-green-500' : 'text-red-500'} ${password.length > 0?'block':'hidden'}`}>
                                    {password.length > 0 && passwordRegex.uppercase.test(password)?<IoMdCheckmarkCircleOutline size={20} color='green'/>:<FaXmark color='red' size={20} />}{" "}<span>Le mot de passe doit contenir au moins une lettre majuscule</span>
                                </li>
                                <li className={`flex flex-row justify-start items-start gap-2 ${passwordRegex.lowercase.test(password) ? 'text-green-500' : 'text-red-500'} ${password.length > 0?'block':'hidden'}`}>
                                    {password.length > 0 && passwordRegex.lowercase.test(password)?<IoMdCheckmarkCircleOutline size={20} color='green'/>:<FaXmark color='red' size={20} />}{" "}<span>Le mot de passe doit contenir au moins une lettre minuscule</span>
                                </li>
                                <li className={`flex flex-row justify-start items-start gap-2 ${passwordRegex.specialChars.test(password) ? 'text-green-500' : 'text-red-500'} ${password.length > 0?'block':'hidden'}`}>
                                    {password.length > 0 && passwordRegex.specialChars.test(password)?<IoMdCheckmarkCircleOutline size={20} color='green'/>:<FaXmark color='red' size={20} />}{" "}<span>Le mot de passe doit contenir au moins un chiffre spécial</span>
                                </li>
                                <li className={`flex flex-row justify-start items-start gap-2 ${passwordRegex.numbers.test(password) ? 'text-green-500' : 'text-red-500'} ${password.length > 0?'block':'hidden'}`}>
                                    {password.length > 0 && passwordRegex.numbers.test(password)?<IoMdCheckmarkCircleOutline size={20} color='green'/>:<FaXmark color='red' size={20} />}{" "}<span>Le mot de passe doit contenir au moins un chiffre</span>
                                </li>
                            </ul>
                        </div>
                        <Button className='w-full' disabled={checkCredentialsValidity()} >signup</Button>
                        <p className='w-full'>
                            Already have an account?
                        </p>
                        <Button type='button' className='w-full'>
                            <Link href="/login">
                                Login
                            </Link>
                        </Button>
                    </motion.form>
            </div>
            {
                isLoading && (
                    <Loader type={LoadingProps.LOADING}/>
                )
            }
            {
                error && error == AuthErrorType.USER_ERROR && (
                    <p className='text-red-500 text-lg'>
                        User already exists
                    </p>
                )
            }
            {
                error && error == AuthErrorType.CRED_ERROR && (
                    <p className='text-red-500 text-lg'>
                        Invalid credentials
                    </p>
                )
            }
        </main>
    )
}
