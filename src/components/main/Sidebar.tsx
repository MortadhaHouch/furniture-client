"use client";

import React, { useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { MdHomeFilled, MdCategory } from "react-icons/md";
import { FaUsers, FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { User } from "../../../utils/types"; // assuming this defines your UserRole type
import { FaCartShopping, FaGear, FaMessage } from "react-icons/fa6";
import { Avatar } from "./Avatar";
export default function Sidebar({ user }: { user: User }) {
  const [isShown, setIsShown] = useState(false);
  const location = usePathname();
  const adminMenuItems = [
    { href: "/dashboard", label: "Accueil", icon: <MdHomeFilled /> },
    { href: "/dashboard/categories", label: "Categories", icon: <MdCategory /> },
    { href: "/dashboard/commandes", label: "Commandes", icon: <FaCartShopping />},
    { href: "/dashboard/utilisateurs", label: "Utilisateurs", icon: <FaUsers /> },
    { href: "/dashboard/profil", label: "Mon Compte", icon: <FaUser /> },
    { href: "/dashboard/notifications", label: "Notifications", icon: <IoIosNotifications /> },
    { href: "/dashboard/messages", label: "Messages", icon: <FaMessage /> },
    { href: "/dashboard/settings", label: "Paramètres", icon: <FaGear /> },
  ];

  const userMenuItems = [
    { href: "/dashboard", label: "Accueil", icon: <MdHomeFilled /> },
    { href: "/dashboard/profil", label: "Mon Compte", icon: <FaUser /> },
    { href: "/dashboard/notifications", label: "Notifications", icon: <IoIosNotifications /> },
    { href: "/dashboard/settings", label: "Paramètres", icon: <FaGear /> },
    { href: "/dashboard/messages", label: "Messages", icon: <FaMessage /> },
  ];

  // Select menu items based on user role
  const menuItems = user.role === "ADMIN" ? adminMenuItems : userMenuItems;

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: isShown ? 0 : -250 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen fixed top-0 left-0 w-64 bg-slate-200 dark:bg-gray-700 bg-opacity-65 flex flex-col pt-20 z-40 shadow-lg backdrop-blur-md"
    >
      <Button
        className="absolute -right-3 bottom-5 p-2 bg-slate-300 dark:bg-gray-500 rounded-full shadow-md"
        onClick={() => setIsShown((val) => !val)}
      >
        {isShown ? <GoSidebarExpand /> : <GoSidebarCollapse />}
      </Button>

      <div className="bg-slate-300 dark:bg-gray-500 flex flex-col justify-center items-center gap-2 p-4">
        <h2 className="text-xl"><span className="text-md text-gray-400 text-opacity-60">Bienvenue</span> <br/>{user.firstName} {user.lastName}</h2>
        <Avatar src={user.avatar} username={`${user.firstName} ${user.lastName}`}/>
        <p className="opacity-75">{user.email}</p>
      </div>

      <ul className="w-full flex flex-col p-2 gap-2">
        {menuItems.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring", delay: index * 0.1 }}
            whileTap={{ scale: 1.1 }}
            exit={{
              opacity: 0,
              x: -30,
              transition: { duration: 0.5, ease: "easeInOut", delay: 0.5 * index },
            }}
            className={`w-full ${
              location === item.href ? "bg-primary text-white rounded-lg" : ""
            }`}
          >
            <Link
              href={item.href}
              className="w-full flex items-center gap-2 p-1 hover:pl-5 transition-all"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.aside>
  );
}
