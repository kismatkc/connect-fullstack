import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MessengerActivePeople = () => {
  return (
    <div className="flex flex-row gap-x-3  p-3  items-center">
      {Array.from({ length: 8 }).map(() => (
        <div className="flex gap-x-3">
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
