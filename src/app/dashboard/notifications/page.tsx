"use client"
import React, { useEffect, useState } from 'react'
import { LoadingProps, Notification as NotificationType } from '../../../../utils/types'
import Notification from "../../../components/main/Notification"
import fetchData from '../../../../utils/fetchData'
import Loader from '@/components/main/Loader'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
export default function Notifications() {
    const [notifications,setNotifications] = useState<NotificationType[]>([])
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [cookie] = useCookies(["auth_token"]);
    const router = useRouter()
    async function handleFetchData(){
        try {
            const data = await fetchData("/notification/1","GET",null,setIsLoading,cookie.auth_token,"json","json");
            if(data.isVerified){
                setNotifications(data.notifications);
            }else{
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        if(cookie.auth_token){
            handleFetchData();
        }else{
            router.push("/login")
        }
    },[])
    return (
        <main className='w-full min-h-screen flex flex-col justify-start items-center flex-wrap pt-28'>
            <h1 className='text-4xl font-bold'>Notifications</h1>
            <section className='flex flex-row justify-center items-center flex-wrap gap-2'>
                {
                    notifications && notifications.length > 0 ?(
                        notifications.map((item,idx)=>{
                            return (
                                <Notification notification={item} key={idx}/>
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
        </main>
    )
}
