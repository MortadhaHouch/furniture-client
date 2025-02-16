"use client";

import { useCallback, useEffect, useState } from "react";
import Sidebar from "@/components/main/Sidebar";
import { LoadingProps, User } from "../../../utils/types";
import fetchData from "../../../utils/fetchData";
import { useCookies } from "react-cookie";
import Loader from "@/components/main/Loader";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [cookie] = useCookies(["auth_token"]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleFetchData =  useCallback(async()=> {
    if (!cookie.auth_token) {
      router.push("/login");
      return;
    }

    try {
      const data = await fetchData("/user/data", "GET", null, setIsLoading, cookie.auth_token,"json","json");
      if (data?.isVerified && data?.user) {
        setUser(data.user);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      router.push("/login");
    }
  }, [cookie.auth_token, router]);
  useEffect(() => {
    handleFetchData();
  }, []);

  if (isLoading) return <Loader type={LoadingProps.LOADING} />;

  return (
    <>
      {user && <Sidebar user={user} />}
      {children}
    </>
  );
}
