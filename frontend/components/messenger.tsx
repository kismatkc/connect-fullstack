"use client";
import { useMessengerStore } from "@/hooks/global-zustand-hooks";
import { cn } from "@/lib/utils";
import { ArrowLeft, Search } from "lucide-react";
import { useEffect, useRef } from "react";
import MessengerActivePeople from "./messenger-active-people";
import MessengerExistingMessages from "./messenger-existing-messages";

export default function Messenger() {
  const { openSheet, setOpenSheet } = useMessengerStore();
  const messengerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainElement = document.getElementById("main");
    const closeMessenger = (e: Event) => {
      // if (!messengerRef.current?.contains(e.target as Node)) {
      //   setOpenSheet(false);
      // }
    };
    if (openSheet) {
      document.body.classList.add("h-screen", "overflow-hidden");
      mainElement?.classList.add("overflow-hidden");
    }

    // Cleanup when component unmounts or open changes
    return () => {
      document.body.classList.remove("h-screen", "overflow-hidden");
      mainElement?.classList.remove("overflow-hidden");
    };
  }, [openSheet, messengerRef]);

  return (
    <section
      ref={messengerRef}
      className={cn(
        "z-40 absolute flex flex-col h-full  w-[83vw] right-0 translate-x-full  transition-transform duration-300 ease-in-out container-bg-light container-bg-dark",
        {
          "translate-x-0": openSheet,
        },
      )}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {openSheet && (
        <ArrowLeft
          className="absolute -left-7 top-16 "
          onClick={() => setOpenSheet(false)}
          size={28}
        />
      )}
      <header className="flex flex-row justify-between p-3 ">
        <span className="font-semibold text-xl">Chats</span>
        <div className="flex relative">
          <Search className="absolute top-1/4 left-1 " size={16} />
          <input
            type="text"
            className="bg-icon-bg-light dark:bg-icon-bg-dark rounded-full text-xs  pl-6"
            placeholder="Search messenger"
          />
        </div>
      </header>
      <MessengerActivePeople />
      <MessengerExistingMessages />
    </section>
  );
}
