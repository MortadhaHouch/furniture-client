"use client"
import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { UserRole } from '../../utils/types';
interface AuthContextType {
    isLogged: boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    user: UserRole;
}
const auth:AuthContextType = {
    isLogged: false,
    setIsLoggedIn:(val)=>val,
    user: UserRole.USER,
}
const AuthContext:React.Context<AuthContextType> = createContext(auth)
export default function AuthContextProvider({children}:{children:React.ReactNode}) {
    const [isLogged,setIsLoggedIn] = useState(false);
    return (
        <AuthContext.Provider value={{isLogged,setIsLoggedIn,user:UserRole.USER}}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthContext}