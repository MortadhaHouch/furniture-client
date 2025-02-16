"use client"
import React, { useCallback, useEffect, useState } from 'react'
import fetchData from '../../../../utils/fetchData';
import { useCookies } from 'react-cookie';
import { LoadingProps, User as UserType} from '../../../../utils/types';
import Loader from '@/components/main/Loader';
import User from '@/components/main/User';
export default function Users() {
    const [cookie] = useCookies(["auth_token"])
    const [isLoading, setIsLoading] = React.useState(false);
    const [users,setUsers] = useState<UserType[]>([]);
    const [page,setPage] = useState<number>(1);
    const handleFetchData =  useCallback(async() =>{
        try {
            const request = await fetchData(`/user/get-all/${page}`,"GET",null,setIsLoading,cookie.auth_token,"json","json");
            if(request.isVerified){
                setUsers(request.users);
                setPage(request.totalPages);
            }
        } catch (error) {
            console.log(error);
        }
    },[cookie.auth_token,page])
    useEffect(()=>{
        if(cookie.auth_token){
            handleFetchData();
        }
    },[])
    return (
        <main className='w-full min-h-screen flex flex-col justify-start items-center flex-wrap pt-28'>
            <h1 className='text-3xl font-bold'>Users</h1>
            <section className='w-full flex flex-col justify-center items-center gap-2 flex-wrap'>
                <div className='w-full flex flex-row justify-center items-center flex-wrap gap-2'>
                    {
                        users.length > 0 ?(
                            <>
                                {
                                    users.map((item,idx)=>{
                                    return (
                                        <User user={item} key={idx}/>
                                    )})
                                }
                            </>
                        ):(
                            <h2 className='text-2xl font-bold'>No users found</h2>
                        )
                    }
                </div>
                <div className='flex flex-row justify-center items-center flex-wrap gap-2'>
                    {
                        Array.from({length:page}).map((_,idx)=>{
                            return (
                                <button className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-400' key={idx} onClick={()=>{
                                    setPage(idx+1);
                                    handleFetchData();
                                }}>
                                    {idx+1}
                                </button>
                            )
                        })
                    }
                </div>
            </section>
            {
                isLoading && (
                    <Loader type={LoadingProps.LOADING}/>
                )
            }
        </main>
    )
}
