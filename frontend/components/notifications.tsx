import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Bell, Check, ExternalLinkIcon, X } from "lucide-react";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import React from "react";
import { notifications } from "@/lib/axios-utils";

const HeaderUserDropDownMenu = () => {
  const [openDropdown, setOpenDrowdown] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const notificationContainerRef = useRef<HTMLDivElement>(null);
  const [friendRequests, setFriendRequests] = useState<
    {
      profile_picture_url: string;
      first_name: string;
      last_name: string;
      id: string;
      requester_id: string;
    }[]
  >([]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const notificationContainer = notificationContainerRef.current;
      const target = e.target;
      if (!notificationContainer?.contains(target as Node)) {
        setOpenDrowdown(false);
      }
    };
    if (openDropdown) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openDropdown]);

  useEffect(() => {
    if (!session) return;
    const getPendingRequests = async () => {
      const friendRequests = await notifications.getPendingRequest(
        session.user.id
      );

      if (friendRequests) {
        console.log("format", friendRequests);

        setFriendRequests(friendRequests);
      }
    };
    getPendingRequests();
  }, [session]);

  return (
    <div className="relative" ref={notificationContainerRef}>
      <button
        className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-8 pl-2 "
        onClick={() => setOpenDrowdown(!openDropdown)}
      >
        <Bell width={16} height={16} fill="black" />
      </button>
      {openDropdown && (
        <div className="z-50 absolute container-bg-dark container-bg-light right-1 top-[130%] shadow-md rounded-md border-t-2 w-[280px]">
          <h1 className="font-bold ml-3 pt-1">Friend Requests</h1>
          <ul className="flex flex-col w-full">
            {friendRequests &&
              friendRequests.map((item) => (
                <div
                  className="flex p-2 justify-between flex-nowrap"
                  key={item.id}
                >
                  <div className="flex gap-x-3">
                    <Avatar className="size-7 ">
                      <AvatarImage src={item.profile_picture_url} />
                    </Avatar>

                    <div className="text-sm font-semibold self-center overflow-x-clip">
                      <span>{item.first_name}</span>
                      <span>{item.last_name}</span>
                    </div>
                  </div>

                  <div className="flex gap-x-2 ml-3 ">
                    <button className=" rounded-full bg-green-400 hover:bg-green-600 flex items-center justify-center p-1">
                      <Check />
                    </button>
                    <button className="  rounded-full bg-red-400 flex hover:bg-red-600 items-center justify-center  p-1">
                      <X />
                    </button>
                    <button
                      className="rounded-full  flex items-center justify-center "
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDrowdown(false);
                        router.push(`/${item.requester_id}`);
                      }}
                    >
                      <ExternalLinkIcon />
                    </button>
                  </div>
                </div>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderUserDropDownMenu;
