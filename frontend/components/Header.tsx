"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

import { Bell, Search } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import ThemeToggleButton from "./theme-toggler-button";
import FacebookMessengerIcon from "@/public/header/facebook-messeneger";
import { useMessengerStore } from "@/hooks/global-zustand-hooks";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const { theme } = useTheme();
  const { openSheet, setOpenSheet } = useMessengerStore();

  useEffect(() => {
    setMounted(true);
  }, [session]);

  if (!mounted) return null;
  return (
    <header className="flex  justify-between  container-bg-light dark:container-bg-dark  px-2 py-4 border-light border-dark  z-30 sticky -top-3 left-0 right-0">
      <div className="flex gap-x-3">
        <Image
          className="size-[30px] scale-125 self-center"
          src={`/header/connect-logo-${
            theme === "light" ? "lighttheme" : "darktheme"
          }.png`}
          alt="connect logo"
          width={30}
          height={30}
          priority
        />
        <div className="flex relative pr-1">
          <Search className="absolute top-1/4 left-2  " size={16} />
          <input
            type="text"
            className="bg-icon-bg-light dark:bg-icon-bg-dark rounded-full text-xs  pl-7"
            placeholder="Search messenger"
          />
        </div>
      </div>
      <div className="flex gap-x-1 justify-between items-center ">
        <ThemeToggleButton />
        <button
          className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark  pb-1 pr-1
                         hover:bg-gray-200 dark:hover:bg-gray-700
                         transition-all duration-200"
          onClick={() => setOpenSheet(true)}
        >
          <FacebookMessengerIcon />
        </button>
        <button className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-8 pl-2">
          <Bell width={16} height={16} fill="black" />
        </button>
        <button
          className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-8 flex items-center justify-center"
          onClick={() => {
            signOut();
          }}
        >
          {session?.user?.name && session?.user?.name[0].toLocaleUpperCase()}
        </button>
      </div>
    </header>
  );
};

export default Header;
