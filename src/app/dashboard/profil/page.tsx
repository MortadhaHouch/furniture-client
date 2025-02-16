"use client";

import { useCallback, useEffect, useState } from "react";
import fetchData from "../../../../utils/fetchData";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import Loader from "@/components/main/Loader";
import { LoadingProps, User, Product } from "../../../../utils/types";
import { Avatar } from "@/components/main/Avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cookie] = useCookies(["auth_token"]);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const handleFetchData =useCallback(async()=> {
    try {
      const data = await fetchData("/user/data", "GET", null, setIsLoading, cookie.auth_token,'json',"json");
      if (data.isVerified) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  },[cookie])

  useEffect(() => {
    if (cookie.auth_token) {
      handleFetchData();
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <main className="w-full min-h-screen flex flex-col items-center py-10">
      {user ? (
        <section className="w-full max-w-4xl rounded-xl shadow-lg p-8">
          <Card className="flex flex-col md:flex-row md:items-center gap-8">
            <CardHeader className="relative w-32 h-32 md:w-40 md:h-40 flex justify-center items-center">
              <Avatar fallbackClassName="w-full h-full" src={user.avatar} username={`${user.firstName} ${user.lastName}`}/>
            </CardHeader>
            <CardContent className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">{user.firstName} {user.lastName}</h1>
              <p className="text-gray-500 text-lg mt-1">Role: <span className="font-medium text-indigo-600">{user.role}</span></p>
              <p className="text-gray-500 text-lg mt-1">
                Member since:{" "}
                <span className="font-medium">
                  {user.timestamps.createdAt.toLocaleString().split("T")[0].split("-").reverse().join("/")}
                </span>
              </p>
            </CardContent>
          </Card>
          <Card className="mt-8 grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-6">
            <CardHeader className="p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
              <p className="text-gray-600 mt-2">📧 Email: <span className="font-medium">{user.email}</span></p>
              <p className="text-gray-600 mt-2">📞 Phone: <span className="font-medium">{user.phone?user.phone:'unconnu'}</span></p>
              <p className="text-gray-600 mt-2">🏠 Address: <span className="font-medium">{user.address?user.address:'unconnu'}</span></p>
            </CardHeader>
            <CardContent className="p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800">Saved Products</h2>
              {user.savedProducts.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {user.savedProducts.map((product: Product, index) => (
                    <li
                      key={index}
                      className="p-3 rounded-md shadow-sm border bg-opacity-65 hover:bg-opacity-100 transition"
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mt-2">No saved products.</p>
              )}
            </CardContent>
          </Card>
        </section>
      ) : (
        isLoading && <Loader type={LoadingProps.LOADING} />
      )}
    </main>
  );
}
