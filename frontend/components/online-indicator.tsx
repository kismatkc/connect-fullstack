import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const OnlineIndicator = ({
  profilePictureUrl,
  firstName,
  status,
}: {
  profilePictureUrl: string;
  firstName: string;
  status: string;
}) => {
  const [online, setOnline] = useState<boolean>(status === "online");
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
