"use client";

import React,{useContext, useState} from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu as NavigationMenuComponent,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { furnitureCategories, trends } from "../../../utils/constants";
import { AuthContext } from "@/providers/AuthContext";
import fetchData from "../../../utils/fetchData";
import { useCookies } from "react-cookie";
import { AuthErrorType, LoadingProps } from "../../../utils/types";
import Loader from "./Loader";
import { redirect } from "next/navigation";

export function NavigationMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {isLogged} = useContext(AuthContext)
  const [isLoading,setIsLoading] = useState(false);
  const [cookie,,removeCookie] = useCookies(["auth_token"]);
  const [error,setError] = useState<AuthErrorType|null>(null);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  async function handleLogout(){
    try {
      const request = await fetchData("/user/logout","POST",{},setIsLoading,cookie.auth_token);
      if(request.logout_message){
        removeCookie("auth_token", { path: "/"});
        localStorage.clear();
        setIsLoading(false);
        redirect("/login")
      }else if(request.user_message){
        setError(AuthErrorType.CRED_ERROR);
        setTimeout(()=>{
          setError(null)
        },2000)
      }else if(request.auth_message){
        setError(AuthErrorType.CRED_ERROR);
        setTimeout(()=>{
          setError(null)
        },2000)
      }
    }catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className="relative flex flex-row justify-between items-center">
      <Button
        className="md:hidden p-2 rounded-lg focus:outline-none"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>
      {isMobileMenuOpen && (
        <div className="w-screen bg-slate-500 flex flex-col justify-start items-end fixed inset-0 z-50 backdrop-blur-md p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Menu</h2>
            <Button onClick={toggleMobileMenu} variant="ghost">
              <X size={24} />
            </Button>
          </div>
          <NavigationMenuComponent className="w-full flex flex-col justify-start items-start backdrop-blur-md p-2 rounded-md space-y-4 bg-slate-300 dark:bg-slate-600">
            <NavigationMenuList className="w-full flex flex-col justify-start items-start space-y-4">
              <MobileMenuItem title="Nos Collections" href="/" />
              <MobileMenuItem title="Catégories" href="/categories" />
              <MobileMenuItem title="Contact" href="/contact" />
            </NavigationMenuList>
          </NavigationMenuComponent>
        </div>
      )}
      <NavigationMenuComponent
        className="hidden md:flex justify-between items-center w-full"
      >
        <NavigationMenuList className="flex space-x-6">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Nos Collections</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink href="/" asChild>
                    <div
                      className="w-full h-full flex flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 relative overflow-hidden"
                    >
                      <video
                        src="/assets/videos/animation.mp4"
                        className="w-full h-full absolute top-0 left-0 object-cover"
                        autoPlay
                        loop
                        muted
                      />
                      <div className="absolute bottom-0 left-0 w-full p-2 backdrop-blur-md bg-gradient-to-b from-transparent to-black/70">
                        <h3 className="text-lg font-medium text-white">
                          Prestige Déco
                        </h3>
                        <p className="text-sm text-gray-300">
                          Des meubles design et de qualité pour transformer
                          votre intérieur.
                        </p>
                      </div>
                    </div>
                  </NavigationMenuLink>
                </li>
                {trends.map((item, idx) => (
                  <ListItem key={idx} href={item.href} title={item.title}>
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Catégories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {furnitureCategories.map((category) => (
                  <ListItem
                    key={category.title}
                    title={category.title}
                    href={category.href}
                  >
                    {category.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {
            cookie.auth_token?.length > 0 || isLogged ? (
              <>
                <NavigationMenuItem>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <Button className="bg-red-500" onClick={handleLogout}>Logout</Button>
              </>
            ):(
              <>
                <NavigationMenuItem>
                  <Link href="/login" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      login
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/signup" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      signup
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            )
          }
        </NavigationMenuList>
        <NavigationMenuList>
        </NavigationMenuList>
      </NavigationMenuComponent>
      {
        error && (
          <Loader type={LoadingProps.ERROR}/>
        )
      }
      {
        isLoading && (
          <Loader type={LoadingProps.LOADING}/>
        )
      }
    </nav>
  );
}

const MobileMenuItem = ({ title, href }: { title: string; href: string }) => (
  <Link href={href} className="block text-lg font-medium text-muted-foreground hover:text-foreground">
    {title}
  </Link>
);

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none transition-colors hover:bg-accent focus:bg-accent",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium">{title}</div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = "ListItem";
