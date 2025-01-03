import { useMobileChatSheetStore } from "@/hooks/global-zustand-hooks";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useRef } from "react";
import useGetFriends from "@/hooks/get-friends";
import { useSession } from "next-auth/react";
const ChatOrFriendsTab = () => {
  const { setShowIndividualChat, setUser } = useMobileChatSheetStore();
  const { data: user } = useSession();
  const chatsOrFriendsContainerRef = useRef<HTMLDivElement>(null);
  const { data: friends } = useGetFriends(user?.user?.id);
  const chats = [
    {
      profile_picture_url:
        "https://lotpqdywijkjinsgfkkv.supabase.co/storage/v1/object/public/profile_pictures/1734105690633-dvfinal.jpg",
      first_name: "Henry",
      last_name: "Campbell",
      lastMessage: "Hey, how are you?",
      id: 1,
    },
    {
      profile_picture_url:
        "https://lotpqdywijkjinsgfkkv.supabase.co/storage/v1/object/public/profile_pictures/1734105690633-dvfinal.jpg",
      first_name: "Alice",
      last_name: "Johnson",
      lastMessage: "Are we still on for today?",
      id: 2,
    },
    {
      profile_picture_url:
        "https://lotpqdywijkjinsgfkkv.supabase.co/storage/v1/object/public/profile_pictures/1734105690633-dvfinal.jpg",
      first_name: "James",
      last_name: "Smith",
      lastMessage: "Let me know when you're free.",
      id: 3,
    },
    {
      profile_picture_url:
        "https://lotpqdywijkjinsgfkkv.supabase.co/storage/v1/object/public/profile_pictures/1734105690633-dvfinal.jpg",
      first_name: "Emma",
      last_name: "Davis",
      lastMessage: "Thanks for the update!",
      id: 4,
    },
    {
      profile_picture_url:
        "https://lotpqdywijkjinsgfkkv.supabase.co/storage/v1/object/public/profile_pictures/1734105690633-dvfinal.jpg",
      first_name: "Oliver",
      last_name: "Brown",
      lastMessage: "See you soon.",
      id: 5,
    },
  ];

  return (
    <Tabs defaultValue="chats" className="w-full">
      <TabsList className="w-full mb-2  bg-icon-bg-light dark:bg-icon-bg-dark">
        <TabsTrigger value="chats" className="w-full">
          Chats
        </TabsTrigger>
        <TabsTrigger value="friends" className="w-full">
          Friends
        </TabsTrigger>
      </TabsList>
      <TabsContent value="chats">
        <section className="flex flex-col gap-y-2 h-full">
          <h1 className="font-bold text-xl">Chats</h1>
          <div
            className="flex flex-col gap-y-4 h-full overflow-y-scroll"
            ref={chatsOrFriendsContainerRef}
            onClick={(e) => {
              const container = chatsOrFriendsContainerRef.current;
              const target = e.target as HTMLElement;
              if (container?.contains(target) && target === container) return;
              const divParent = target.closest("[data-user]") as HTMLDivElement;
              if (!divParent?.dataset?.user) return;
              const data = JSON.parse(divParent.dataset.user);
              const user: any = {
                id: data.id,
                name: `${data.first_name} ${data.last_name}`,
                profilePicture: data.profile_picture_url,
                status: "online",
              };
              console.log(user);

              setUser(user);

              setShowIndividualChat(true);
            }}
          >
            {chats?.length > 0 ? (
              chats.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-x-1 justify-start"
                  data-user={JSON.stringify(item)}
                >
                  <Image
                    src={item?.profile_picture_url as string}
                    alt={`${item.first_name} picture `}
                    width={48}
                    height={48}
                    className="rounded-full w-[48px] h-[48px]"
                    priority
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{`${item?.first_name} ${item?.last_name}`}</span>
                    <span className="text-sm font-medium ">
                      {item?.lastMessage}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <span className="text-sm font-semibold">
                  You dont have any past conversations.
                </span>
              </div>
            )}
          </div>
        </section>
      </TabsContent>
      <TabsContent value="friends">
        <section className="flex flex-col gap-y-2 h-full">
          <h1 className="font-bold text-xl">Friends</h1>
          <div
            className="flex flex-col gap-y-4 h-full overflow-y-scroll"
            ref={chatsOrFriendsContainerRef}
            onClick={(e) => {
              const container = chatsOrFriendsContainerRef.current;
              const target = e.target as HTMLElement;
              if (container?.contains(target) && target === container) return;
              const divParent = target.closest("[data-user]") as HTMLDivElement;
              if (!divParent?.dataset?.user) return;
              const data = JSON.parse(divParent.dataset.user);
              const user: any = {
                id: data.id,
                name: `${data.first_name} ${data.last_name}`,
                profilePicture: data.profile_picture_url,
                status: "online",
              };
              console.log(user);

              setUser(user);

              setShowIndividualChat(true);
            }}
          >
            {friends && friends?.length > 0 ? (
              friends.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-start items-center gap-x-5"
                  data-user={JSON.stringify(item)}
                >
                  <Image
                    src={item?.profile_picture_url as string}
                    alt={`${item.first_name} picture `}
                    width={48}
                    height={48}
                    className="rounded-full w-[48px] h-[48px]"
                    priority
                  />
                  <span className="text-lg font-semibold">
                    {item?.first_name}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <span className="text-sm font-semibold">You dont friends</span>
              </div>
            )}
          </div>
        </section>
      </TabsContent>
    </Tabs>
  );
};

export default ChatOrFriendsTab;
