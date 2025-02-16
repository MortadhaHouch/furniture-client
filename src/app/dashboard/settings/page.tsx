"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import fetchData from "../../../../utils/fetchData";
import { useCookies } from "react-cookie";
import Loader from "@/components/main/Loader";
import { emailRegex, LoadingProps, passwordRegex, phoneNumberRegex } from "../../../../utils/types";
import { redirect } from "next/navigation";

export default function Settings() {
  const [firstName, setFIrstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [secondaryEmail,setSecondaryEmail] = useState<string>("")
  const [updatedPassword,setUpdatedPassword] = useState<string>("")
  const [newPassword,setNewPassword] = useState<string>("")
  const [phone,setPhone] = useState<string>("")
  const [address,setAddress] = useState<string>("")
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [cookie] = useCookies(['auth_token'])
  const [notificationsEnabled,setNotificationsEnabled] = useState<boolean>(false);
  const checkPasswordMatch =() => {
    if(updatedPassword.length > 8){
      const passwordConditions = [
        {
          message: "les mots de passe ne sont pas compatibles",
          condition: updatedPassword === newPassword
        },{
          message: "le mot de passe doit contenir au moins une lettre minuscule",
          condition:passwordRegex.lowercase.test(updatedPassword)
        },{
          message: "le mot de passe doit contenir au moins une lettre majuscule",
          condition:passwordRegex.uppercase.test(updatedPassword)
        },{
          message: "le mot de passe doit contenir au moins un charactère spécial",
          condition:passwordRegex.specialChars.test(updatedPassword)
        }
      ]
      return passwordConditions.filter(condition => !condition.condition)
    }else{
      return [
        {
          message: "le mot de passe doit contenir au moins 8 charactères",
          condition: updatedPassword.length > 8
        }
      ]
    }
  }
  const handleUpdateProfile = async () => {
    if(checkPasswordMatch().length === 0){
      try {
        const data = {
          firstName,
          lastName,
          secondaryEmail,
          password:updatedPassword,
          address,
          phone:parseInt(phone.split("+216")[1]),
          notificationsEnabled,
        }
        const requestData = Object.entries(data).reduce((acc,value) => {
          return {
            ...acc,
            [`${value[0]}`]:value[1]
          }
        },{})
        console.log(requestData);
        
        const request = await fetchData("/user/update-profile","PUT",requestData,setIsLoading,cookie.auth_token,"json","json");
        if(request.message){
          alert(request.message);
        }
        if(request.ok){
          localStorage.setItem("email",request.email)
          localStorage.setItem("firstName",request.firstName)
          localStorage.setItem("lastName",request.lastName)
          redirect("/dashboard")
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      alert("Veuillez vérifier vos informations et réessayer")
    }
  }
  useEffect(()=>{
    console.log(notificationsEnabled);
  },[notificationsEnabled])
  return (
    <main className="w-screen min-h-screen flex flex-col items-center pt-28">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Settings</h1>
      <section className="mb-8 w-[80%] flex flex-col justify-center items-center max-w-2xl shadow-lg rounded-lg bg-slate-200 dark:bg-gray-800 p-3">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Settings</h2>
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className="text-gray-600">first name</label>
            <Input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFIrstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className="text-gray-600">last name</label>
            <Input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className="text-gray-600">secondary email</label>
            <Input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter secondary email"
              value={secondaryEmail}
              onChange={(e) => setSecondaryEmail(e.target.value)}
            />
            {
              secondaryEmail.length > 0 &&!emailRegex.test(secondaryEmail) && (
                <span className="text-red-600">email is not valid</span>
              )
            }
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className="text-gray-600">update password</label>
            <Input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter password"
              value={updatedPassword}
              onChange={(e) => setUpdatedPassword(e.target.value)}
            />
            {
              updatedPassword.length > 0 && checkPasswordMatch().map((value,key) =>{
                return (
                  <span key={key} className="text-red-600">{value.message}</span>
                )
              })
            }
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className="text-gray-600">confirm password</label>
            <Input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="confirm password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {
              updatedPassword.length > 0 && newPassword.length > 0 && updatedPassword != newPassword && (
                <span className="text-red-600">passwords don&apos;t match</span>
              )
            }
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className="text-gray-600">address</label>
            <Input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <label className="text-gray-600">address</label>
            <Input
              type="tel"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="update phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {
              phone.length > 0 && !phone.match(phoneNumberRegex) && (
                <span className="text-red-600">phone number should valid</span>
              )
            }
          </div>
          <div className="flex flex-row justify-start items-center gap-2 w-full">
            <Input type="checkbox" className="w-[25px]" name="notifications" id="notifications" checked={notificationsEnabled} onChange={(e) => setNotificationsEnabled(e.target.checked)}/>
            <label htmlFor="notifications" className="text-gray-600 select-none">Notifications activées</label>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <Button className="w-full" disabled={isLoading || checkPasswordMatch().length > 0} onClick={handleUpdateProfile}>update data</Button>
          </div>
        </div>
      </section>
      {
        isLoading && (
          <Loader type={LoadingProps.LOADING}/>
        )
      }
    </main>
  );
}
