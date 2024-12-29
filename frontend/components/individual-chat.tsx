import { Loader2, PhoneIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import AutoGrowTextarea from "./auto-grow-text-area";
import { useMobileChatSheetStore } from "@/hooks/global-zustand-hooks";
const IndividualChat = () => {
  // const user = {
  //   picture:
  //     "https://lotpqdywijkjinsgfkkv.supabase.co/storage/v1/object/public/profile_pictures/1734105690633-dvfinal.jpg",
  //   name: "Henry Campbell",
  //   status: "Online",
  // };
  const { user } = useMobileChatSheetStore();

  if (!user)
    return (
      <section className="flex w-full h-full ">
        <Loader2 className="animate-spin" />
      </section>
    );

  return (
    <section className="flex flex-col h-full ">
      <div className="flex justify-between ">
        <div className="flex gap-x-1">
          <Image
            src={user?.picture as string}
            alt={`${user.name} picture `}
            width={36}
            height={36}
            className="rounded-full w-[36px] h-[36px]"
            priority
          />
          <div className="flex flex-col">
            <span className="text-base font-semibold">{user?.name}</span>
            <span className="text-sm">{user?.status}</span>
          </div>
        </div>

        <div className="flex gap-x-4">
          <PhoneIcon />
          <VideoIcon />
        </div>
      </div>
      <div className="grow overflow-y-scroll"></div>
      <AutoGrowTextarea placeholder="Type message" userId={"1"} />
    </section>
  );
};

export default IndividualChat;
