"use client"
import { useCallback, useEffect, useState } from "react";
import { LoadingProps, Order } from "../../../../utils/types";
import { useCookies } from "react-cookie";
import fetchData from "../../../../utils/fetchData";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Loader from "@/components/main/Loader";
import { FaLocationArrow } from "react-icons/fa";
import Link from "next/link";

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [cookie] = useCookies(["auth_token"]);

  const handleFetchData = useCallback(async (page: number)=> {
    try {
      setIsLoading(true);
      const request = await fetchData(`/product/latest-sales/${page}`, "GET", null, setIsLoading, cookie.auth_token);
      if (request.isVerified) {
        setOrders(request.orders);
        const sum = request.orders.reduce((acc:number, order:Order) => acc + order.totalPrice, 0);
        setTotalSum(sum);
        setCurrentPage(request.page);
        setPagesCount(request.pagesCount);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [cookie.auth_token]);

  useEffect(() => {
    handleFetchData(currentPage);
  }, [currentPage,handleFetchData]);

  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center pt-28">
      <h1 className="text-2xl font-bold">Commandes récentes</h1>
      <section className="w-[80%] max-w-7xl flex flex-col justify-center items-center gap-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Nom</TableHead>
              <TableHead className="w-[10%]">Quantité</TableHead>
              <TableHead className="w-[10%]">Prix</TableHead>
              <TableHead className="w-[30%]">Utilisateur</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders && orders.length > 0 ? (
              orders.map((order) => {
                const userName = `${order.user.firstName} ${order.user.lastName}`;
                return (
                  <TableRow key={order.id}>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.count}</TableCell>
                    <TableCell>{order.totalPrice} €</TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard/utilisateurs/${order.user.id}`}
                        className="flex flex-row justify-center items-center gap-2"
                      >
                        <FaLocationArrow />
                        <span>{userName}</span>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4}>Aucun produit trouvé</TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell>{totalSum} €</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <div className="flex flex-row justify-center items-center gap-2">
          {pagesCount > 1 &&
            Array.from({ length: pagesCount }, (_, index) => (
              <Button
                key={index}
                onClick={() => {
                  setCurrentPage(index + 1);
                  handleFetchData(index + 1);
                }}
                variant={index + 1 === currentPage ? "default" : "outline"}
                disabled={isLoading}
              >
                {index + 1}
              </Button>
            ))}
        </div>
      </section>
      {isLoading && <Loader type={LoadingProps.LOADING} />}
    </main>
  );
}
