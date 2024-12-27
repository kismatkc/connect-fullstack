import {
  Ellipsis,
  Laugh,
  Loader2,
  MessageCircle,
  Send,
  Share,
  Smile,
  SmileIcon,
  ThumbsUp,
  Share2Icon,
  TrashIcon,
} from "lucide-react";

import Like from "./like";
import { useEffect, useState } from "react";
import { comments } from "@/lib/axios-utils";
import { toast } from "sonner";
import useGetAllPostComments from "@/hooks/get-all-comment";
import { useQueryClient } from "@tanstack/react-query";

import Image from "next/image";
import { ViewMoreComment } from "./comment-sheet";
import ReadMore from "./read-more-text";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,

} from "@radix-ui/react-dropdown-menu";
import useConfirmation from "./confirmation";
import AutoGrowTextarea from "./auto-grow-text-area";
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
  const { ConfirmationModel, decision: getDecision } = useConfirmation();
const [open,setOpen] = useState<boolean>(false)
  const { data, error } = useGetAllPostComments(postId);
  useEffect(() => {}, [data]);
  const queryClient = useQueryClient();
  if (!data || error) {
    return (
      <div className="p-8 flex items-center justify-center w-full">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full mt-2 icon-bg-light dark:icon-bg-dark">
      <ConfirmationModel
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your
            comment and also remove it from our servers."
      />
      <div className="flex justify-between border-b-2 pb-3 items-center">
        <Like postId={postId} userId={userId} />

        <Share />
      </div>
      <div className="flex flex-col pt-2 pb-1">
        <ViewMoreComment
          showMoreButton={!(data && data.length > 1)}
          userId={userId}
          //@ts-ignore
          comments={data}
          postId={postId}
        />

        {data && data.length > 0 ? (
          <div
            className="flex justify-between items-start  gap-x-3"
            key={data[0].id}
          >
            <Image
              src={data[0].profilePictureUrl}
              alt={data[0].firstName[0].toLocaleUpperCase()}
              width={40}
              height={40}
              className="rounded-full"
              priority
            />
            <div className="flex flex-col grow ">
              <div className="flex justify-between pb-2">
                <div className="flex flex-nowrap ">
                  <span>{data[0].firstName}</span>
                  <span>{data[0].lastName}</span>
                </div>
                <DropdownMenu open={open} onOpenChange={(state)=> {setOpen(state)}}>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Ellipsis className="size-6  cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-[30]">
                    {userId === data[0].id && (
                      <div className=" dark:text-white dark:container-bg-dark container-bg-light hover:bg-gray-200 dark:hover:bg-black flex  p-1.5 items-center w-full">
                        <TrashIcon size={16} />
                        <button
                          onClick={async () => {
                            try {
                              const decision = await getDecision();
                              const commentId = data[0].commentId;
                              if (!decision || !commentId) return;
                              setOpen(false)
                              const response = await comments.delete(commentId);
                              if (response) {
                                toast.success("Comment deleted successfully");

                                return queryClient.invalidateQueries({
                                  queryKey: ["comments", postId],
                                  exact: true,
                                });
                              }
                              return toast.error("Error deleting Comment");
                            } catch (error) {}
                          }}
                          className="px-4"
                        >
                          Delete
                        </button>
                      </div>
                    )}

                    <div className=" dark:text-white dark:container-bg-dark container-bg-light hover:bg-gray-200 dark:hover:bg-black flex  p-1.5 items-center ">
                      <Share2Icon size={16} />
                      <button className="px-4">Share</button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="grow bg-icon-bg-light dark:bg-icon-bg-dark rounded-lg text-left break-all p-3 hyphens-auto text-ellipsis">
                {data[0].description.length > 70 ? (
                  <ReadMore description={data[0].description} />
                ) : (
                  data[0].description
                )}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full font-medium text-center py-2 px-1">
            <p>Be the first one to comment.</p>
          </div>
        )}

        <div className="flex gap-x-2 pt-4 items-center mt-1">
          <Image
            src={profilePictureUrl}
            alt={fullName[0].toLocaleUpperCase()}
            width={40}
            height={40}
            className="rounded-full"
            priority
          />


          <AutoGrowTextarea
            placeholder={`Comment as ${fullName}`}
            postId={postId}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
