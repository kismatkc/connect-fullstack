import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMessengerStore } from "@/hooks/global-zustand-hooks";

const MessengerExistingMessages = () => {
  const [overflowing, setOverflowing] = useState(false);
  const messegesRef = useRef<HTMLDivElement>(null);
  const { setOpenChatbox } = useMessengerStore();
  useEffect(() => {
    if (messegesRef.current) {
      messegesRef.current.scrollHeight > messegesRef.current.clientHeight &&
        setOverflowing(true);
    }
  }, [overflowing]);

  return (
    <section
      className="flex flex-col p-3  h-full overflow-y-auto scroll-smooth"
      ref={messegesRef}
      onClick={(e: any) => {
        const parent = messegesRef.current;
        const target = e.target;
        if (parent?.contains(target)) return setOpenChatbox(true);
      }}
    >
      <div className="flex flex-col ">
        {Array.from({ length: 50 }).map((_, index) => (
          <div className="flex items-center p-3" key={index}>
            <Avatar className="mr-4">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-[600] text-sm">Mohan kc</span>
              <span className="text-xs">Nameste baba</span>
            </div>
          </div>
        ))}
      </div>

      {!overflowing && (
        <div className="flex justify-center items-center mt-12">
          No more messages
        </div>
      )}
    </section>
  );
};

export default MessengerExistingMessages;
