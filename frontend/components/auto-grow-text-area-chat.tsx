import { comments } from "@/lib/axios-utils";
import { normalizeInput } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Send, SmileIcon } from "lucide-react";
import { socketInstance } from "@/lib/web-sockets";

import React, { useState, useRef, FormEvent, useEffect } from "react";
import { toast } from "sonner";

import EmojiPicker from "emoji-picker-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";

const AutoGrowTextarea = ({
  placeholder,
  senderId,
  receiverId,
  message,
  setMessage,
  setMessages,
}: {
  placeholder: string;

  senderId: string;

  receiverId: string;
  message: string;
  setMessage: (message: string) => void;
  setMessages: (message: {
    message: string;
    senderId: string;
    receiverId: string;
    created_at: number;
  }) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const queryClient = useQueryClient();
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height

      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to match content
    }
  };

  return (
    <div className="flex flex-col w-full mt-2 absolute bottom-0 left-0 right-0">
      <textarea
        id="message"
        ref={textareaRef}
        onInput={(e: any) => {
          const message = e.target.value;

          setMessage(message);

          handleInput();
        }}
        value={message}
        rows={1}
        placeholder={placeholder}
        className="w-full pb-7 pt-3 pl-2.5 text-baserounded-lg resize-none overflow-hidden focus:outline-none  bg-icon-bg-light dark:bg-icon-bg-dark rounded-lg h-full mb-7 text-left"
      />
      <div className="flex justify-between -mt-14 pt-1 px-1">
        <DropdownMenu
          open={openEmoji}
          onOpenChange={(state) => setOpenEmoji(state)}
        >
          <DropdownMenuTrigger asChild>
            <div className="[&>svg]:stroke-[1.5px] dark:[&>svg]:stroke-[1px] [&>svg]:stroke-gray-700 dark:[&>svg]:stroke-white ">
              <SmileIcon className="cursor-pointer " />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" className="pl-14 pt-2">
            <EmojiPicker
              open={openEmoji}
              reactionsDefaultOpen
              onEmojiClick={({ emoji }) => {
                const textarea = textareaRef.current as HTMLTextAreaElement;
                const { selectionStart: emojiPosition } = textarea;
                const beforeEmoji = textarea.value.substring(0, emojiPosition);
                const afterEmoji = textarea.value.substring(emojiPosition);
                const newDescription = beforeEmoji + emoji + afterEmoji;
                setMessage(newDescription);
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <Send
          className="stroke-[1.5px] dark:stroke-[1px] stroke-gray-700 dark:stroke-white cursor-pointer"
          onClick={async () => {
            try {
              if (!message) return toast.error("Opps you forgot to write");

              const trimmedDescription = normalizeInput(message);

              socketInstance.emit("sendMessage", {
                receiverId,
                message: trimmedDescription,
              });

              setMessages({
                message,
                senderId,
                receiverId,
                created_at: Date.now(),
              });

              setMessage("");
            } catch (error: any) {
              return toast.error(error.message);
            }
          }}
        />
      </div>
    </div>
  );
};

export default AutoGrowTextarea;
