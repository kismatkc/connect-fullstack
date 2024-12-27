import { comments } from "@/lib/axios-utils";
import { normalizeInput } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Send, SmileIcon } from "lucide-react";
import React, { useState, useRef, FormEvent, useEffect } from "react";
import { toast } from "sonner";
import Emojis from "./emoji-picker";
import EmojiPicker from "emoji-picker-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";


const AutoGrowTextarea = ({
  placeholder,
  postId,
  userId,
}: {
  placeholder: string;
  postId: string;
  userId: string;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [description, setDescription] = useState<string>("");
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
    <div className="flex flex-col w-full ">
      <textarea
        id="description"
        ref={textareaRef}
        onInput={(e: any) => {
          const description = e.target.value;

      
          setDescription(description);

          handleInput();
        }}
        value={description}
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
                const beforeEmoji = textarea.value.substring(0,emojiPosition)
                const afterEmoji = textarea.value.substring(emojiPosition)
                const newDescription = beforeEmoji + emoji + afterEmoji;
              setDescription(newDescription)
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <Send
          className="stroke-[1.5px] dark:stroke-[1px] stroke-gray-700 dark:stroke-white cursor-pointer"
          onClick={async () => {
            try {
              if (!description) return toast.error("Opps you forgot to write");
              const trimmedDescription = normalizeInput;
              const response = await comments.create({
                postId,
                userId,
                description: trimmedDescription(description),
              });
              setDescription("");
              queryClient.invalidateQueries({
                queryKey: ["comments", postId],
              });
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
