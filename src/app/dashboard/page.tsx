"use client";

import { useEffect, useState, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import fetchData from '../../../utils/fetchData';
import AdminDashboard from '@/components/main/AdminDashboard';
import UserDashboard from '@/components/main/UserDashboard';
import Loader from '@/components/main/Loader';
import { LoadingProps, User } from '../../../utils/types';

export default function HomePage() {
    const [cookies] = useCookies(["auth_token"]);
    const authToken = cookies?.auth_token;
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleFetchData = useCallback(async () => {
        try {
            const data = await fetchData("/user/data", "GET", null, setIsLoading, authToken,"json","json");
            if (data?.isVerified) {
                setUser(data.user);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }, [authToken]);

    useEffect(() => {
        handleFetchData();
    }, [handleFetchData]);

    if (isLoading) return <Loader type={LoadingProps.LOADING} />;
    
    return user ? (user.role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />) : null;
}
