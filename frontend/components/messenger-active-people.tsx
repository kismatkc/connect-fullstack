import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMessengerStore } from "@/hooks/global-zustand-hooks";

const MessengerActivePeople = () => {
  const { setOpenChatbox } = useMessengerStore();
  const activePeopleContainer = useRef<HTMLDivElement>(null);

  return (
    <div
      className="flex flex-row gap-x-3  p-3  items-center"
      ref={activePeopleContainer}
      onClick={(e: any) => {
        const parent = activePeopleContainer.current;
        const target = e.target;
        if (parent?.contains(target)) return setOpenChatbox(true);
      }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="flex gap-x-3" key={index}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  );
};

export default MessengerActivePeople;
