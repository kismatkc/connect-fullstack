import { cn } from "@/lib/utils";
import { socketInstance } from "@/lib/web-sockets";
import Image from "next/image";
import { useEffect, useState } from "react";

const OnlineIndicator = ({
  profilePictureUrl,
  firstName,
  status,
  id,
}: {
  profilePictureUrl: string;
  firstName: string;
  status: string;
  id: string;
}) => {
  const [online, setOnline] = useState<boolean>(status === "online");

  useEffect(() => {
    const handleOnline = (userId: string) => {
      if (id === userId) {
        setOnline(true);
      }
    };

    const handleOffline = (userId: string) => {
      if (id === userId) {
        setOnline(false);
      }
    };
    socketInstance.on("isOnline", handleOnline);
    socketInstance.on("isOffline", handleOffline);

    () => {
      socketInstance.off("isOnline", handleOnline);
      socketInstance.off("isOffline", handleOffline);
    };
  }, []);
  return (
    <div className="relative">
      <Image
        src={profilePictureUrl}
        alt={`${firstName[0].toLocaleUpperCase()} picture `}
        width={48}
        height={48}
        className="rounded-full w-[48px] h-[48px] "
        priority
      />
      <div
        className={cn(
          "size-2 bg-gray-800 absolute right-[14%] bottom-[14%] rounded-full transition-colors",
          { "bg-green-800": online }
        )}
      ></div>
    </div>
  );
};

export default OnlineIndicator;
