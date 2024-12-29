import { useMobileChatSheetStore } from "@/hooks/global-zustand-hooks";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useRef } from "react";
import useGetFriends from "@/hooks/get-friends";
import { useSession } from "next-auth/react";
const ChatOrFriendsTab = () => {
  const { setShowIndividualChat } = useMobileChatSheetStore();
  const {data: user}= useSession();
  const chatsOrFriendsContainerRef = useRef<HTMLDivElement>(null);
  const {data: friends} = useGetFriends(user?.user?.id)
  const chats = [
    {
      picture:
        "https://lotpqdywijkjinsgfkkv.supabase.co/storage/v1/object/public/profile_pictures/1734105690633-dvfinal.jpg",
      name: "Henry Campbell",
      lastMessage: "Hey, how are you?",
      id: 1,
      timestamp: "2024-12-27T10:00:00Z",
    },
    {
      picture:
        "https://lotpqdywijkjinsgfkkv.supabase.co/storage/v1/object/public/profile_pictures/1734105690633-dvfinal.jpg",
      name: "Alice Johnson",
      lastMessage: "Are we still on for today?",
      id: 2,
      timestamp: "2024-12-27T09:45:00Z",
    },
    {
      picture:
        "https://lotpqdywijkjinsgfkkv.supabase.co/storage/v1/object/public/profile_pictures/1734105690633-dvfinal.jpg",
      name: "James Smith",
      lastMessage: "Let me know when you're free.",
      id: 3,
      timestamp: "2024-12-27T09:30:00Z",
    },
    {
      picture:
        "https://lotpqdywijkjinsgfkkv.supabase.co/storage/v1/object/public/profile_pictures/1734105690633-dvfinal.jpg",
      name: "Emma Davis",
      lastMessage: "Thanks for the update!",
      id: 4,
      timestamp: "2024-12-27T08:50:00Z",
    },
    {
      picture:
        "https://lotpqdywijkjinsgfkkv.supabase.co/storage/v1/object/public/profile_pictures/1734105690633-dvfinal.jpg",
      name: "Oliver Brown",
      lastMessage: "See you soon.",
      id: 5,
      timestamp: "2024-12-27T08:30:00Z",
    },
  ];
 

  return (
    <Tabs defaultValue="chats" className="w-full" >
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
              const target = e.target as any;
              const container = chatsOrFriendsContainerRef.current;
              if (container?.contains(target) && target === container) return;
              setShowIndividualChat(true);
            }}
          >
            {chats?.length > 0 ? (
              chats.map((user) => (
                <div key={user.id} className="flex gap-x-1 justify-start">
                  <Image
                    src={user?.picture as string}
                    alt={`${user.name} picture `}
                    width={48}
                    height={48}
                    className="rounded-full w-[48px] h-[48px]"
                    priority
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{user?.name}</span>
                    <span className="text-sm font-medium ">
                      {user?.lastMessage}
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
              const target = e.target as any;
              const container = chatsOrFriendsContainerRef.current;
              
              if (container?.contains(target) && target === container) return;
              setShowIndividualChat(true);
            }}
          >
            {friends && friends?.length > 0 ? (
              friends.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-start items-center gap-x-5"
                >
                  <Image
                    src={user?.profile_picture_url as string}
                    alt={`${user.first_name} picture `}
                    width={48}
                    height={48}
                    className="rounded-full w-[48px] h-[48px]"
                    priority
                  />
                  <span className="text-lg font-semibold">{user?.first_name}</span>
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
