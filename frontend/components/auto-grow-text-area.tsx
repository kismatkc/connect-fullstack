import { comments } from "@/lib/axios-utils";
import { normalizeInput } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Send, SmileIcon } from "lucide-react";
import React, { useState, useRef, FormEvent } from "react";
import { toast } from "sonner";

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

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height

      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to match content
    }
  };

  return (
    <div className="flex relative w-full flex-col">
      <textarea
        id="description"
        ref={textareaRef}
        onInput={(e: any) => {
          const description = e.target.value;

          setDescription(description);

          handleInput;
        }}
        value={description}
        rows={1}
        placeholder={placeholder}
        className="w-full py-6 pl-2.5 text-baserounded-lg resize-none overflow-hidden focus:outline-none  bg-icon-bg-light dark:bg-icon-bg-dark rounded-lg h-full mb-3 text-left"
      />
      <div className="flex justify-between absolute w-full bottom-2.5 px-2 ">
        <div className="[&>svg]:stroke-[1.5px] dark:[&>svg]:stroke-[1px] [&>svg]:stroke-gray-700 dark:[&>svg]:stroke-white ">
          <SmileIcon className="cursor-pointer" />
        </div>
        <Send
          className="stroke-[1.5px] dark:stroke-[1px] stroke-gray-700 dark:stroke-white cursor-pointer "
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
