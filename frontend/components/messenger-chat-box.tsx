"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ImageIcon,
  Minus,
  Phone,
  Search,
  Send,
  SmileIcon,
  Video,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMessengerStore } from "@/hooks/global-zustand-hooks";

const MessengerChatBox = () => {
  const [chatHead, setChatHead] = useState<boolean>(false);
  const { openChatbox, setOpenChatbox, setOpenSheet } = useMessengerStore();
  if (!openChatbox) return null;

  return (
    <section
      className={cn(
        "  z-50  w-[338px] h-[455px] transition-all duration-50 ease-in-out sticky ",
        {
          "flex flex-col  container-bg-light container-bg-dark  bottom-0 left-[6%]  ":
            !chatHead,
          "size-12 rounded-full bg-black  bottom-10 left-[85%] ": chatHead,
        }
      )}
      onClick={() => {
        if (chatHead) return setChatHead(!chatHead);
      }}
    >
      {!chatHead && (
        <>
          <div className="flex justify-between border-b-2 pb-3">
            <figure className="flex items-center">
              <Avatar className="mr-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <figcaption>Kismat kc</figcaption>
            </figure>

            <div className="flex gap-x-2 items-center">
              <Phone size={21} />
              <Video size={21} />
              <Minus
                size={21}
                onClick={() => {
                  setChatHead(true);
                }}
              />
              <X
                size={21}
                onClick={() => {
                  setOpenChatbox(false);
                }}
              />
            </div>
          </div>
          <div className="grow"></div>
          <div className="flex border-t-2 py-2">
            <div className="flex justify-between w-full py-3">
              <div className="flex grow pr-2 pl-2 relative">
                <input
                  type="text"
                  className="bg-icon-bg-light dark:bg-icon-bg-dark rounded-full text-sm pl-3 py-2 w-full"
                  placeholder="Type here..."
                />
                <Send className="absolute right-5 top-2 rotate-45" size={20} />
              </div>

              <div className="flex gap-x-2 items-center pr-1">
                <ImageIcon />
                <SmileIcon />
              </div>
            </div>
          </div>
        </>
      )}
      {chatHead && (
        <Avatar className="w-full h-full">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
    </section>
  );
};

export default MessengerChatBox;
