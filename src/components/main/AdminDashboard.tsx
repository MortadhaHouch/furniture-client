"use client"
import { AreaChart } from '@/components/charts/AreaChart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LargeChart } from '../charts/LargeChart';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FaLocationArrow } from 'react-icons/fa';
import Link from 'next/link';
import { LoadingProps, OrderTypeSlug, Product } from '../../../utils/types';
import fetchData from '../../../utils/fetchData';
import { useCookies } from 'react-cookie';
import Loader from './Loader';
import { NumberTicker } from './NumberTicker';

export default function AdminDashboard() {
    const [salesToday,setSalesToday] = useState<number>(0)
    const [salesYesterday,setSalesYesterday] = useState<number>(0)
    const [orders,setOrders] = useState<number>(0)
    const [cancelled,setCancelled] = useState<number>(0)
    const [users,setUsers] = useState<{date:string,labels:number}[]>([])
    const [monthlySales,setMonthlySales] = useState<{date:string,labels:number}[]>([])
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [cookie] = useCookies(["auth_token"])
    const [largerData,setLargerData] = useState<{date:string,labels:number,ventes:number}[]>([])
    const [latestSales,setLatestSales] = useState<Product[]>([]);
    const handleFetchData =useCallback(async ()=> {
        try {
            const request = await fetchData("/product/stats","GET",null,setIsLoading,cookie.auth_token);
            if (request.isVerified) {
                const {latestSales,salesToday,salesYesterday,orders,cancelled,users,monthlySales} = request;
                setSalesToday(salesToday)
                setSalesYesterday(salesYesterday)
                setOrders(orders)
                setCancelled(cancelled)
                setUsers(users.map((user:{date:string,labels:number}) => {return {date:new Date(user.date).toDateString(),labels:user.labels}}))
                setMonthlySales(monthlySales.map((sale:{date:string,labels:number}) => {return {date:new Date(sale.date).toDateString(),labels:sale.labels}}))
                setLatestSales(latestSales)
                console.log(users,monthlySales);
                
                const sales_users = []
                let minimumArrayLength;
                if (users.length > monthlySales.length) {
                    minimumArrayLength = monthlySales.length;
                } else {
                    minimumArrayLength = users.length;
                }
                for (let i = 0; i < minimumArrayLength; i++) {
                    sales_users.push({
                        date: users[i].date,
                        labels: users[i].labels,
                        ventes: salesToday
                    })
                }
                setLargerData(sales_users)
            }
        } catch (error) {
            console.log(error);
        }
    },[cookie.auth_token])
    useEffect(() => {
        handleFetchData();
    }, [handleFetchData])
    return (
        <main className='w-full min-h-screen flex flex-col justify-start items-center flex-wrap pt-28'>
            <header className='w-full max-w-6xl px-4 mb-8'>
                <h1 className='text-3xl font-bold '>Tableau de Bord</h1>
                <p className='text-gray-600'>Aperçu des performances et des statistiques</p>
            </header>
            <section className='w-full max-w-6xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
                <div className="border p-6 rounded-lg hover:shadow-md hover:-translate-y-2 transition-all ease-in-out dark:bg-gray-900 relative">
                    <h3 className='text-lg font-semibold mb-2'>Commandes par jour</h3>
                    <p className='text-3xl font-bold text-blue-600'><NumberTicker value={salesToday}/> </p>
                    <p className='text-sm text-gray-500'>+{salesYesterday} par rapport à hier</p>
                    <Button className='bg-secondary text-black dark:text-white absolute top-1 right-1'><Link href={`/dashboard/commandes/${OrderTypeSlug.SUCCESSFUL}`}><FaLocationArrow size={20}/></Link></Button>
                </div>
                <div className="border p-6 rounded-lg hover:shadow-md hover:-translate-y-2 transition-all ease-in-out dark:bg-gray-900 relative">
                    <h3 className='text-lg font-semibold mb-2'>Commandes en cours</h3>
                    <p className='text-3xl font-bold text-green-600'><NumberTicker value={orders}/> </p>
                    <p className='text-sm text-gray-500'>En attente de livraison</p>
                    <Button className='bg-secondary text-black dark:text-white absolute top-1 right-1'><Link href={`/dashboard/commandes/${OrderTypeSlug.ORDER_PENDING}`}><FaLocationArrow size={20}/></Link></Button>
                </div>
                <div className="border p-6 rounded-lg hover:shadow-md hover:-translate-y-2 transition-all ease-in-out dark:bg-gray-900 relative">
                    <h3 className='text-lg font-semibold mb-2'>Commandes annulées</h3>
                    <p className='text-3xl font-bold text-red-600'><NumberTicker value={cancelled}/> </p>
                    <p className='text-sm text-gray-500'>-10% par rapport au mois dernier</p>
                    <Button className='bg-secondary text-black dark:text-white absolute top-1 right-1'><Link href={`/dashboard/commandes/${OrderTypeSlug.ORDER_CANCELED}`}><FaLocationArrow size={20}/></Link></Button>
                </div>
            </section>
            <section className='w-full max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
                <div className="border shadow-sm p-6 rounded-lg col-span-1">
                    <h3 className='text-lg font-semibold mb-4'>Ventes mensuelles</h3>
                    <div className="h-64 dark:bg-gray-900 rounded-md flex items-center justify-center">
                        {
                            monthlySales && Array.isArray(monthlySales) && monthlySales.length > 0 ? (
                                <AreaChart label="sales" data={monthlySales}/>
                            ):(
                                <p className='text-center'>Aucune donnee disponible</p>
                            )
                        }
                    </div>
                </div>
                <div className="border shadow-sm p-6 rounded-lg col-span-1">
                    <h3 className='text-lg font-semibold mb-4'>Acquisition de clients</h3>
                    <div className="h-64 dark:bg-gray-900 rounded-md flex items-center justify-center">
                        {
                            users && Array.isArray(users) && users.length > 0 ? (
                                        <AreaChart label="users" data={users}/>
                            ):(
                                <p className='text-center'>Aucune donnee disponible</p>
                            )
                        }
                    </div>
                </div>
                <LargeChart className="col-span-1 md:col-span-2" title="ventes par rapport aux nombre d'utilisateurs" description='' data={largerData}/>
            </section>
            <section className='w-full max-w-6xl px-4 mb-8'>
                <div className=" p-6 rounded-lg dark:bg-gray-900 shadow-md">
                    <h3 className='text-lg font-semibold text-gray-700 mb-4'>Commandes récentes</h3>
                    <div className='overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow className="py-4 px-4 border-b border-gray-200 text-left text-sm text-slate-800 dark:text-slate-200">
                                    <TableHead>ID Commande</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>nom du produit</TableHead>
                                    <TableHead>Montant</TableHead>
                                    <TableHead>Statut</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    latestSales.length > 0 ?(
                                        latestSales.map(sale => (
                                            <TableRow key={sale.id}>
                                                <TableCell>
                                                    <Link href={`/dashboard/commande/${sale.id}`}>
                                                        <a>{sale.id}</a>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{sale.createdAt.toLocaleString()}</TableCell>
                                                <TableCell>{sale.name}</TableCell>
                                                <TableCell>{sale.price}</TableCell>
                                                <TableCell className={sale.status === OrderTypeSlug.SUCCESSFUL.toString() ? "text-green-600" : "text-red-600"}>{sale.status}</TableCell>
                                            </TableRow>
                                        ))
                                    ):(
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">Aucune commande récente</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </div>
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
