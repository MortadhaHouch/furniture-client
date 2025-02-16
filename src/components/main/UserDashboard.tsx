"use client";

import { motion } from "framer-motion";
import { NumberTicker } from "../ui/number-ticker";
import { LoadingProps, User, UserStats } from "../../../utils/types";
import { useCallback, useEffect, useState } from "react";
import fetchData from "../../../utils/fetchData";
import { useCookies } from "react-cookie";
import Loader from "./Loader";
import Image from "next/image";
import { Avatar } from "./Avatar";

export default function UserDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cookie] = useCookies(["auth_token"]);

    const handleFetchData = useCallback(async () => {
        try {
            const request = await fetchData("/user/stats", "GET", null, setIsLoading, cookie.auth_token);
            if (request.isVerified) {
                setUserStats(request.userStats);
                setUser(request.user);
            }
        } catch (error) {
            console.log(error);
        }
    }, [cookie.auth_token]);

    useEffect(() => {
        handleFetchData();
    }, []);

    if (isLoading) {
        return <Loader type={LoadingProps.LOADING} />;
    }

    return (
        <main className="w-full min-h-screen flex flex-col items-center pt-20 px-6">
            <section className="w-full max-w-6xl bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center md:items-start">
                {
                    user?.avatar && (
                        <Avatar src={user?.avatar} username={`${user?.firstName} ${user?.lastName}`} fallbackClassName="text-2xl" />
                    )
                }
                <div className="ml-6">
                    <h1 className="text-3xl font-bold">Tableau de Bord</h1>
                    <h2 className="text-xl text-gray-700">Bienvenue, {user?.firstName} {user?.lastName}</h2>
                    <p className="text-gray-500">Email: {user?.email}</p>
                    <p className="text-gray-500">Téléphone: {user?.phone}</p>
                    <p className="text-gray-500">Adresse: {user?.address}</p>
                </div>
            </section>

            <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
                {userStats ? (
                    <>
                        <DashboardCard title="Commandes passées" count={userStats.completed} className="bg-yellow-100 text-yellow-600" />
                        <DashboardCard title="Commandes réussies" count={userStats.completed} className="bg-green-100 text-green-600" />
                        <DashboardCard title="Commandes sauvegardées" count={userStats.savedProducts.length} className="bg-blue-100 text-blue-600" />
                    </>
                ) : (
                    <p className="col-span-3 text-center">Aucune donnée disponible</p>
                )}
            </section>

            <section className="w-full max-w-6xl mt-8">
                <h2 className="text-xl font-bold">Vos dernières commandes</h2>
                <div className="overflow-x-auto mt-4">
                    {userStats && userStats.savedProducts.length > 0 ? (
                        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 rounded-lg">
                            <thead>
                                <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                                    <th className="p-4">Produit</th>
                                    <th className="p-4">Catégorie</th>
                                    <th className="p-4">Prix</th>
                                    <th className="p-4">Quantité</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userStats.savedProducts.map((product, index) => (
                                    <tr key={index} className="border-t border-gray-300">
                                        <td className="p-4">{product.name}</td>
                                        <td className="p-4">{product.category}</td>
                                        <td className="p-4">{product.price}€</td>
                                        <td className="p-4">{product.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <Image src="/assets/icons/not-found.svg" alt="Empty" width={200} height={200} className="mx-auto mt-6" />
                    )}
                </div>
            </section>

            {isLoading && <Loader type={LoadingProps.LOADING} />}
        </main>
    );
}

function DashboardCard({ title, count, className }: { title: string; count: number; className?: string }) {
    return (
        <motion.div className={`p-6 rounded-lg shadow-md ${className}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl font-bold">
                <NumberTicker value={count} />
            </p>
        </motion.div>
    );
}