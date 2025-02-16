"use client";
import { useParams } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  EffectCards,
  EffectCube,
  EffectFlip,
  Parallax,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaBookmark } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { products } from "../../../../utils/constants";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { MovingBorderButton } from "@/components/main/MovingBorderButton";
// import { Slider } from "@radix-ui/react-slider";
export default function Slug() {
  const slug = useParams();
  const formattedParam = slug.slug.toString().split(",").join(" ").split("-").join(" ")
  const [searchTerm,setSearchTerm] = useState("");
//   const [value, setValue] = useState<number[]>([20, 37]);
  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center flex-wrap pt-28 gap-3">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{formattedParam}</h1>
        <div className="flex flex-row justify-center items-center gap-2 flex-wrap w-[80%] max-w-7xl">
            <Input className="w-full h-full md:w-1/2 lg:w-1/3 p-3" placeholder="Rechercher un produit" onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchTerm(e.target.value)}/>
            <MovingBorderButton className="w-full px-4 py-2 text-lg" disabled={searchTerm.length === 0}>Rechercher</MovingBorderButton>
            {/* <Slider aria-label="Temperature range" value={value} defaultValue={[25, 75]} /> */}
        </div>
        <section className="w-full flex flex-row justify-center items-center gap-2 flex-wrap">
            {
                products
                .filter((product) => product.category.includes(formattedParam))
                .filter((product) => product.category.includes(searchTerm))
                .map((product, idx) => {
                    return (
                    <Card key={idx} className="w-[300px] h-[450px] px-4 gap-2">
                        <CardHeader className="w-full flex flex-row justify-between items-center p-1 relative">
                            <h2 className="mt-4 text-xl font-bold">{product.name}</h2>
                            <p className="mt-4 text-green-400 text-lg px-4 py-2 rounded-md">
                                {product.price}
                            </p>
                        </CardHeader>
                        <CardContent>
                        <Swiper
                            modules={[
                                Navigation,
                                Pagination,
                                Scrollbar,
                                A11y,
                                EffectCoverflow,
                                EffectCards,
                                EffectCube,
                                EffectFlip,
                                Parallax,
                            ]}
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            className="w-full flex justify-center items-center"
                            effect="cards"
                        >
                            {product.images.map((image, idx) => {
                            return (
                                <SwiperSlide
                                key={idx}
                                className="w-[150px] aspect-square flex justify-center items-center overflow-hidden"
                                >
                                <Image
                                    width={150}
                                    height={150}
                                    className="w-full h-full object-cover object-center"
                                    src={
                                    "https://random-image-pepebigotes.vercel.app/api/random-image"
                                    }
                                    alt={product.name}
                                />
                                </SwiperSlide>
                            );
                            })}
                        </Swiper>
                        </CardContent>
                        <p className="mt-2 text-gray-700">{product.description}</p>
                        <CardFooter className="w-full justify-center items-center gap-1">
                        <Button className="mt-4 bg-primary text-white px-4 py-2 rounded-md flex-1">
                            <FaCartPlus />
                        </Button>
                        <Button className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-md flex-1">
                            <FaBookmark />
                        </Button>
                        <Button className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-md flex-1">
                            {product.reviews.length}
                            <FaBookmark />
                        </Button>
                        </CardFooter>
                    </Card>
                    );
                })
            }
        </section>
    </main>
  );
}
