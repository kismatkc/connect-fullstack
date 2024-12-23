import {
  Ellipsis,
  Laugh,
  MessageCircle,
  Send,
  Share,
  Smile,
  SmileIcon,
  ThumbsUp,
} from "lucide-react";
import Like from "./like";
import { useEffect, useState } from "react";
import { comments } from "@/lib/axios-utils";
import { toast } from "sonner";
import useGetAllPostComments from "@/hooks/get-all-comment";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ViewMoreComment } from "./comment-sheet";

const CommentSection = ({
  postId,
  userId,
  profilePictureUrl,
  fullName,
}: {
  postId: string;
  userId: string;
  profilePictureUrl: string;
  fullName: string;
}) => {
  const [description, setDescription] = useState<string>("");
  const { data, error, isLoading } = useGetAllPostComments(postId);
  useEffect(() => {}, [data]);
  const queryClient = useQueryClient();
  return (
    <div className="flex flex-col w-full mt-2 icon-bg-light dark:icon-bg-dark">
      <div className="flex justify-between border-b-2 pb-3 items-center">
        <Like postId={postId} userId={userId} />

        <Share />
      </div>
      <div className="flex flex-col pt-2 pb-1">
        {/* <button
          className={cn("text-base text-left transition-opacity", {
            "opacity-0 invisible": !(data && data.length > 1),
          })}
        >
          View more comments
        </button> */}
        <ViewMoreComment showMoreButton={!(data && data.length > 1)} />
        {data && data.length > 0 ? (
          <figure className="flex gap-x-2 items-center pt-3 ">
            <Image
              src={data[0].profilePictureUrl}
              alt={data[0].firstName[0].toLocaleLowerCase()}
              width={40}
              height={40}
              className="rounded-full"
              priority
            />

            <figcaption className="flex flex-col px-4 py-1 rounded-full  bg-icon-bg-light dark:bg-icon-bg-dark">
              <div className="flex flex-nowrap gap-x-1">
                <span>{data[0].firstName}</span>
                <span>{data[0].lastName}</span>
              </div>
              <span>{data[0].description}</span>
            </figcaption>
            <Ellipsis className="size-6 opacity-50 cursor-pointer" />
          </figure>
        ) : (
          <div className="w-full font-medium text-center py-2 px-1">
            <p>Be the first one to comment.</p>
          </div>
        )}

        <div className="flex gap-x-2 pt-4 items-center">
          <Image
            src={profilePictureUrl}
            alt={fullName[0].toLocaleLowerCase()}
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          <div className="w-full relative">
            <textarea
              className="w-full border rounded-3xl py-3 px-4 
                         focus:outline-none 
                         min-h-[72px]
                         dark:bg-gray-800 dark:border-gray-700
                         transition-colors duration-200 bg-icon-bg-light dark:bg-icon-bg-dark mr-3"
              placeholder={`Comment as ${fullName}`}
              value={description}
              onChange={(e) => {
                const description = e.target.value;

                setDescription(description);
              }}
            />
            <div className="flex gap-x-1 absolute left-4 bottom-[4%]  [&>svg]:stroke-[1.5px] dark:[&>svg]:stroke-[1px] [&>svg]:stroke-gray-700 dark:[&>svg]:stroke-white mb-1">
              <SmileIcon className="cursor-pointer" />
            </div>
            <Send
              className="absolute bottom-[4%] right-3 stroke-[1.5px] dark:stroke-[1px] stroke-gray-700 dark:stroke-white cursor-pointer mr-1 mb-1"
              onClick={async () => {
                try {
                  if (!description)
                    return toast.error("Opps you forgot to write");
                  const response = await comments.create({
                    postId,
                    userId,
                    description,
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
      </div>
    </div>
  );
};

export default CommentSection;
