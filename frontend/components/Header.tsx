"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

import { Bell } from "lucide-react";
import SearchBar from "./search-bar";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const {data: session} = useSession()
  useEffect(() => {
    setMounted(true);
    console.log(session);
    
  }, [session]);

  if (!mounted) return null;
  return (
    <header className="flex justify-between container-bg-light dark:container-bg-dark  p-2 border-light border-dark gap-x-2">
      <SearchBar />
      <div className="flex gap-x-2 justify-end items-center ">
        <button className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-10 pl-2.5">
          <Bell width={20} height={20} fill="black" />
        </button>
        <button className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-10 flex items-center justify-center" onClick={()=>{signOut()}}>
          {/* <Bell width={20} height={20} fill="black" /> */}
          {session?.user?.name && session?.user?.name[0].toLocaleUpperCase()}
        </button>
      </div>
    </header>
  );
};

export default Header;
