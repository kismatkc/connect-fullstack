import { Loader2, PhoneIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import AutoGrowTextarea from "./auto-grow-text-area-chat";
import { useMobileChatSheetStore } from "@/hooks/global-zustand-hooks";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { socketInstance } from "@/lib/web-sockets";
const IndividualChat = () => {
  const { receiveruser } = useMobileChatSheetStore();
  const [messages, setMessages] = useState<
    {
      message: string;
      senderId: string;
      receiverId: string;
      created_at: number;
    }[]
  >([]);

  const [message, setMessage] = useState<string>("");
  const { data: senderUser } = useSession();
  useEffect(() => {
    const handleIncomingMessage = (message: string) => {
      // setMessages();
      const messageDetails = {
        message,
        senderId: receiveruser?.id as string,
        receiverId: senderUser?.user.id as string,
        created_at: Date.now(),
      };
      setMessages((old) => {
        console.log(old);
        console.log(messageDetails);

        return [messageDetails, ...old];
      });
    };
    socketInstance.on("receiveMessage", handleIncomingMessage);

    return () => {
      socketInstance.off("receiveMessage", handleIncomingMessage);
    };
  }, [senderUser?.user.id]);
  useEffect(() => {
    console.log(messages);
  }, [messages]);

  if (!receiveruser || !senderUser || !socketInstance)
    return (
      <section className="flex w-full h-full justify-center items-center">
        <Loader2 className="animate-spin" />
      </section>
    );

  return (
    <section className="flex flex-col h-[92%] relative ">
      <div className="flex justify-between ">
        <div className="flex gap-x-1">
          <Image
            src={receiveruser?.profilePicture as string}
            alt={`${receiveruser.name} picture `}
            width={36}
            height={36}
            className="rounded-full w-[36px] h-[36px]"
            priority
          />
          <div className="flex flex-col justify-center">
            <span className="text-base font-semibold">
              {receiveruser?.name}
            </span>
          </div>
        </div>

        <div className="flex gap-x-4">
          <PhoneIcon />
          <VideoIcon />
        </div>
      </div>
      <div className="flex grow overflow-y-scroll flex-col gap-y-2 pt-6">
        {messages &&
          messages
            .slice()
            .sort(({ created_at: a }, { created_at: b }) => a - b)
            .map((message) => {
              return (
                <div
                  className={cn("w-full text-left my-3", {
                    "text-right": message.senderId === senderUser.user.id,
                  })}
                  key={message.created_at}
                >
                  <span className=" bg-icon-bg-light dark:bg-icon-bg-dark rounded-lg px-3 py-3">
                    {message.message}
                  </span>
                </div>
              );
            })}
      </div>
      <AutoGrowTextarea
        placeholder="Type message"
        message={message}
        setMessage={(message: string) => {
          setMessage(message);
        }}
        receiverId={receiveruser.id}
        senderId={senderUser.user.id}
        setMessages={(message: {
          message: string;
          senderId: string;
          receiverId: string;
          created_at: number;
        }) => {
          setMessages((old) => [message, ...old]);
        }}
      />
    </section>
  );
};

export default IndividualChat;
