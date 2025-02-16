"use client";

import { useCallback, useEffect, useState } from "react";
import fetchData from "../../../../utils/fetchData";
import { MagicCard } from "@/components/ui/magic-card";
import Loader from "@/components/main/Loader";
import { Category, LoadingProps, UserRole } from "../../../../utils/types";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Categories() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cookie] = useCookies(["auth_token"]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [file,setFile] = useState<File | null>(null);
  const handleFetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const request = await fetchData(
        `/category/${page}`,
        "GET",
        null,
        setIsLoading,
        "",
        "json",
        "json"
      );
      setPages(request.pages);
      if (request.categories) {
        setCategories(request.categories);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const handleAddCategory = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", categoryName);
      formData.append("description", categoryDescription);
      if(file){
          formData.append("file", file);
      }
      const request = await fetchData(
        "/category/add-category",
        "POST",
        formData,
        setIsLoading,
        cookie.auth_token,
        "formData",
        "json"
      );
  
      if (request.message) {
        alert(request.message);
        setCategoryName("");
        setCategoryDescription("");
        setFile(null);
        handleFetchData();
      }
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [page]);

  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center pt-24 px-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
        Categories
      </h2>

      <section className="w-full flex flex-row justify-center items-center flex-wrap gap-3">
        {categories.length > 0 ? (
          categories.map((item, idx) => (
            <MagicCard
              key={idx}
              className="p-6 border w-[200px] h-[200px] rounded-xl shadow-md relative overflow-hidden hover:shadow-lg transition-all"
            >
              <h3 className="w-full p-2 text-xl font-bold text-center z-10 absolute bottom-4 left-0 bg-opacity-70 bg-black text-white rounded-md">
                {item.name}
              </h3>
              <p className="w-full p-2 text-sm text-center z-10 absolute bottom-0 left-0 bg-opacity-60 bg-black text-white rounded-md">
                {item.description}
              </p>
            </MagicCard>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center gap-4 col-span-full">
            <Image
              src="/assets/images/not-found.png"
              width={200}
              height={200}
              alt="No categories found"
            />
            <h3 className="text-lg font-semibold">No categories found.</h3>
          </div>
        )}
      </section>

      {jwtDecode<{ role: UserRole }>(cookie.auth_token).role === "ADMIN" && (
        <div className="mt-8 w-full max-w-md flex flex-col gap-4 bg-slate-400 dark:bg-slate-700 border-slate-300 dark:border-slate-600 shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-medium">Add New Category</h3>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            type="text"
            placeholder="Enter category name"
            className="p-2 border rounded-md"
          />
          <Textarea
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            placeholder="Enter category description"
            className="p-2 border rounded-md resize-none h-24"
          />
          <div className="flex flex-col justify-center items-center gap-2 mt-4">
            <Input 
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if(e.target.files){
                        setFile(e.target.files[0]);
                    }
                }}
            />
            <div>
                {file && 
                (
                    <Image
                        src={URL.createObjectURL(file)}
                        width={200}
                        height={200}
                        alt="Category image"
                    />
                )}
            </div>
          </div>
          <Button
            onClick={handleAddCategory}
            disabled={isLoading || categoryName.trim().length === 0 || categoryDescription.trim().length === 0 || !file?.type.match(/image\/*/)}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all"
          >
            {isLoading ? "Adding..." : "Add Category"}
          </Button>
        </div>
      )}

      {isLoading && <Loader type={LoadingProps.LOADING} />}

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {Array.from({ length: pages }).map((_, index) => (
          <Button
            key={index}
            onClick={() => setPage(index + 1)}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md ${
              page === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-all`}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </main>
  );
}