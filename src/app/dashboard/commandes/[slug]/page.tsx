"use client";
import { useParams } from "next/navigation";
import { LoadingProps, Order, OrderTypeSlug, OrderType } from "../../../../../utils/types";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import fetchData from "../../../../../utils/fetchData";
import { useCookies } from "react-cookie";
import Loader from "@/components/main/Loader";
import { FaLocationArrow } from "react-icons/fa";

export default function Orders() {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [cookie] = useCookies(["auth_token"]);

  // Directly derive `salesStatus` from `slug` instead of using `useState` and `useEffect`
  const salesStatus: OrderType = (() => {
    switch (slug) {
      case OrderTypeSlug.ORDER_CANCELED:
        return OrderType.CANCELED;
      case OrderTypeSlug.SUCCESSFUL:
        return OrderType.SUCCESSFUL;
      case OrderTypeSlug.ORDER_PENDING:
        return OrderType.PENDING;
      default:
        return OrderType.SUCCESSFUL; // Default case
    }
  })();

  const handleFetchData = useCallback(
    async (page: number) => {
      try {
        const request = await fetchData(
          `/product/${salesStatus.toLowerCase()}/${page}`,
          "GET",
          null,
          setIsLoading,
          cookie.auth_token,
          "json",
          "json"
        );

        if (request?.isVerified) {
          setOrders(request.orders || []);
          setTotalSum(request.orders?.reduce((acc: number, order: Order) => acc + order.totalPrice, 0) || 0);
          setPagesCount(request.pagesCount || 1);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [salesStatus, cookie.auth_token]
  );

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when `salesStatus` changes
  }, [salesStatus]);

  useEffect(() => {
    handleFetchData(currentPage);
  }, [currentPage, handleFetchData]);

  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center flex-wrap pt-28">
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
            {orders.length > 0 ? (
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
                <TableCell colSpan={4} className="text-center">
                  Aucun produit trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell />
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell>{totalSum} €</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <div className="flex flex-row justify-center items-center gap-2 mt-4">
          {Array.from({ length: pagesCount }, (_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              variant={index + 1 === currentPage ? "default" : "outline"}
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
