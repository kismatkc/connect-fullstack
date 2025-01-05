import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { comments as getComments } from "@/lib/axios-utils";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Ellipsis, Share2Icon, TrashIcon } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";

import useConfirmation from "./confirmation";
import ReadMore from "./read-more-text";
import { toast } from "sonner";
export function ViewMoreComment({
  showMoreButton,

  comments,
  userId,
  postId,
}: {
  showMoreButton: boolean;
  userId: string;
  postId: string;
  comments: {
    id: string;

    firstName: string;
    lastName: string;
    profilePictureUrl: string;
    description: string;
    commentId: string;
  }[];
}) {
  const { ConfirmationModel, decision: getDecision } = useConfirmation();
  const queryClient = useQueryClient();
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <button
            className={cn("text-base text-left transition-opacity pb-2", {
              "opacity-0 invisible -mt-3 ": showMoreButton,
            })}
          >
            View more comments
          </button>
        </SheetTrigger>
        <SheetContent className=" flex flex-col py-9 w-[83%] px-3 overflow-y-scroll">
          <ConfirmationModel
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete your
            comment and also remove it from our servers."
          />
          {comments &&
            comments.map((data) => (
              <div
                className="flex justify-between items-start  gap-x-3"
                key={data.commentId}
              >
                <Image
                  src={data.profilePictureUrl}
                  alt={data.firstName[0].toLocaleUpperCase()}
                  width={40}
                  height={40}
                  className="rounded-full"
                  priority
                />
                <div className="flex flex-col grow ">
                  <div className="flex justify-between pb-2">
                    <div className="flex flex-nowrap ">
                      <span>{data.firstName}</span>
                      <span>{data.lastName}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none">
                        <Ellipsis className="size-6  cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="z-[30]">
                        {userId === data.id && (
                          <div className=" dark:text-white dark:container-bg-dark container-bg-light hover:bg-gray-200 dark:hover:bg-black flex  p-1.5 items-center w-full">
                            <TrashIcon size={16} />
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                try {
                                  const decision = await getDecision();

                                  const commentId = data.commentId;
                                  if (!decision || !commentId) return;
                                  const response = await getComments.delete(
                                    commentId
                                  );
                                  if (response) {
                                    toast.success(
                                      "Comment deleted successfully"
                                    );

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
                    {data.description.length > 70 ? (
                      <ReadMore description={data.description} />
                    ) : (
                      data.description
                    )}
                  </p>
                </div>
              </div>
            ))}
        </SheetContent>
      </Sheet>
    </>
  );
}
