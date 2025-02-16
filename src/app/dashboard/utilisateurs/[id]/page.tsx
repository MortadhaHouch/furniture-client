"use client";

import { useParams, useRouter } from "next/navigation";
import { LoadingProps, User } from "../../../../../utils/types";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RiArrowGoBackLine } from "react-icons/ri";
import { FaMessage } from "react-icons/fa6";
import AlertDialog from "@/components/main/AlertDialog";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import fetchData from "../../../../../utils/fetchData";
import Loader from "@/components/main/Loader";
import { useCookies } from "react-cookie";
import { Avatar } from "@/components/main/Avatar";
export default function Page() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [cookie] = useCookies(["auth_token"])
  const router = useRouter();
  const [message,setMessage] = useState<string>("");
  async function handleFetchData(){
    try {
      const data = await fetchData(`/user/${id}`,"GET",null,setIsLoading,cookie.auth_token,"json","json");
      if(data.isVerified){
        if(data.user){
          setUser(data.user);
        }
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
    const sendMessage = async() => {
      if(user){
        try {
          const data = await fetchData("/message/add","POST",{
            receiver:user.id,
            message
          },setIsLoading,cookie.auth_token,"json","json");
          if(data.ok){
            setMessage("");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
        {user?.firstName} {user?.lastName}
      </h1>
      <div className="w-[80%] max-w-4xl mx-auto p-8 flex flex-col justify-center items-center gap-2">
        {user ? (
          <Card className="w-full max-w-4xl">
            <CardHeader className="flex items-center p-6">
              <Avatar src={user?.avatar||""} username={`${user?.firstName} ${user?.lastName}`} fallbackClassName=""/>
              <div className="ml-6">
                <h1 className="text-2xl font-bold">{`${user?.firstName} ${user?.lastName}`}</h1>
                <p className="text-gray-600">{user?.role}</p>
                <p className="text-gray-500 text-sm">
                  Member since: {new Date(user?.timestamps.createdAt).toDateString()}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Email:</span> {user?.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {user?.phone}
                </p>
                <p>
                  <span className="font-medium">Address:</span> {user?.address}
                </p>
              </div>
              <h2 className="text-xl font-semibold mt-6 mb-4">
                Saved Products
              </h2>
              {user?.savedProducts.length > 0 ? (
                <ul className="list-disc ml-6 space-y-2">
                  {user.savedProducts?.map((product, index) => (
                    <li key={index}>
                      {product.name} - ${product.price}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No saved products.</p>
              )}
              <h2 className="text-xl font-semibold mt-6 mb-4">Payment Cards</h2>
              {user.card?.length > 0 ? (
                <ul className="list-disc ml-6 space-y-2">
                  {user.card?.map((card, index) => (
                    <li key={index}>Card {index + 1}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No saved payment cards.</p>
              )}
            </CardContent>
            <CardFooter className="w-full flex justify-center items-center">
              <AlertDialog action="envoyer" actionHandler={()=>sendMessage()} title="" containerClassName="" trigger={<FaMessage size={20}/>}>
                <Textarea value={message} onChange={(e)=>setMessage(e.target.value)}/>
              </AlertDialog>
            </CardFooter>
          </Card>
        ) : (
          <div>
            <h2>Utilisateur non trouvé</h2>
            <Image src="/assets/icons/not-found.svg" alt="" width={100} height={100}/>
          </div>
        )}
        <Button className="cursor-pointer">
          <Link href="/dashboard/utilisateurs" className="flex flex-row justify-center items-center gap-2"><RiArrowGoBackLine size={20}/> <span>Retour</span></Link>
        </Button>
      </div>
      {
        isLoading && (
          <Loader type={LoadingProps.LOADING}/>
        )
      }
    </main>
  );
}
