"use client"
import { Button } from '@/components/ui/button'
import React, { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {LoadingProps, Message as MessageType} from "../../../../utils/types"
import fetchData from '../../../../utils/fetchData'
import Loader from '@/components/main/Loader'
import { useCookies } from 'react-cookie'
import {useRouter} from 'next/navigation'
import Image from 'next/image'
import { Avatar } from '@/components/main/Avatar'
export default function Message() {
    const [messages,setMessages] = useState<MessageType[]>([]);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [cookie] = useCookies(["auth_token"])
    const router = useRouter()
    const [page,setPage] = useState<number>(1);
    const [pagesCount,setPagesCount] = useState<number>(1);
    const handleFetchData = useCallback(async ()=>{
        try {
            const data = await fetchData(`/message/${page}`,"GET",null,setIsLoading,cookie.auth_token,"json","json");
            if(data.isVerified){
                setMessages(data.messages);
                setPagesCount(data.pages);
            }else{
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    },[page,cookie.auth_token])
    useEffect(()=>{
        if(cookie.auth_token){
            handleFetchData();
        }else{
            router.push("/login")
        }
    },[cookie.auth_token,router,handleFetchData])
    return (
        <main className='w-full min-h-screen flex flex-col justify-start items-center flex-wrap pt-28 gap-4'>
            <section className='w-[80%] flex flex-row justify-center items-center gap-2 flex-wrap'>
                {
                    messages.length > 0 ?(
                        messages.map((message:MessageType,index:number)=>{
                            return(
                                <Card key={index} className='w-[300px] h-[250px] p-2 rounded-lg shadow-md flex flex-col justify-between items-center'>
                                    <CardHeader className='w-full p-1'>
                                        <h1 className='text-2xl font-bold'>Message Sent</h1>
                                        <Avatar src={message.from?.avatar} username={`${message.from?.firstName} ${message.from?.lastName}`} fallbackClassName='text-2xl'/>
                                        <span>{new Date(message?.createdAt).toLocaleDateString()}</span>
                                    </CardHeader>
                                    <CardContent className='w-full p-1'>
                                        <p className='w-full text-gray-700 dark:text-gray-300'>
                                            {message?.message.length > 30 ? message?.message.slice(0,30)+'...' : message?.message}
                                        </p>
                                    </CardContent>
                                    <CardFooter className='p-0 mb-0 w-full'>
                                        <Button
                                            className='w-full bg-blue-500 hover:bg-blue-700 font-bold py-3 px-8 rounded-lg'
                                        >
                                            Go back to Homepage
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    ):(
                        <div className='flex flex-col justify-center items-center gap-4'>
                            <Image src="/assets/images/not-found.png" slot='image' width={200} height={200} alt='not-found'/>
                            <h3 className='text-center'>No categories found.</h3>
                        </div>
                    )
                }
            </section>
            {
                isLoading && (
                    <Loader type={LoadingProps.LOADING}/>
                )
            }
            {
                <div className='flex flex-row justify-center items-center flex-wrap gap-2'>
                    {
                        Array.from({length: pagesCount}).map((_,key) => (
                            <Button
                                key={key}
                                className={`px-4 py-2 rounded-lg ${page === key+1? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                                onClick={() => {
                                    setPage(key);
                                    handleFetchData();
                                }}
                            >
                                {key+1}
                            </Button>
                        ))
                    }
                </div>
            }
        </main>
    )
}
