"use client";
import { Ellipsis, Share2Icon, TrashIcon, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import CommentSection from "./comment-section";

import { posts } from "@/lib/axios-utils";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import useConfirmation from "@/components/confirmation";

import useDecidePostContent from "@/hooks/decide-post-content";
import { useEffect, useState } from "react";
const Posts = () => {
  const { data: user } = useSession();
  const { ConfirmationModel, decision: getDecision } = useConfirmation();

  const { postData, isPending, error } = useDecidePostContent();

  const queryClient = useQueryClient();

  if (isPending || error || !postData || !(postData.length > 0 || !user)) {
    return (
      <div className="flex flex-col dark:container-bg-dark container-bg-light gap-y-3">
        <div className="flex gap-x-1 items-center pl-2.5 pt-2 justify-between pr-6 ">
          <div className="flex items-center gap-x-2">
            <Skeleton className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-10 pl-2.5" />
            <Skeleton className="w-28 h-4" />
          </div>
        </div>
        <Skeleton className="w-full h-60 " />

        <div className="flex gap-x-1 items-center pl-2.5 pt-2 justify-between pr-6 ">
          <div className="flex items-center gap-x-2">
            <Skeleton className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-10 pl-2.5" />
            <Skeleton className="w-28 h-4" />
          </div>
        </div>
        <Skeleton className="w-full h-60 " />
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full max-w-[680px] ">
      <ConfirmationModel
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your
            account and remove your data from our servers."
      />
      {postData.map((post) => {
        return (
          <Card
            className="flex flex-col icon-bg-light dark:icon-bg-dark dark:container-bg-dark container-bg-light w-full "
            key={post.postId}
          >
            <CardHeader className="flex flex-col pl-1.5 pb-4">
              <div className="flex justify-between items-center mb-2 ">
                <Link href={`/${post.user.userId}`}>
                  <figure className="flex gap-x-2 items-center">
                    <Avatar className="size-8 ">
                      <AvatarImage
                        src={post.user.avatarLink}
                        className="rounded-full"
                      />
                      <AvatarFallback className="rounded-full">
                        {post.user.firstName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <figcaption className="flex flex-nowrap gap-x-1">
                      <span>{post.user.firstName}</span>
                      <span>{post.user.lastName}</span>
                    </figcaption>
                  </figure>
                </Link>
                <div className="flex items-center gap-x-1.5">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="z-[30]">
                      {user?.user.id === post.user.userId && (
                        <div className=" dark:text-white dark:container-bg-dark container-bg-light hover:bg-gray-200 dark:hover:bg-black flex  p-1.5 items-center w-full">
                          <TrashIcon size={16} />
                          <button
                            onClick={async () => {
                              try {
                                const decision = await getDecision();
                                const postId = post.postId;
                                if (!decision || !postId) return;
                                const response = await posts.deletePost(postId);
                                if (response) {
                                  toast.success("Post deleted successfully");

                                  return queryClient.invalidateQueries({
                                    queryKey: ["posts-yours"],
                                    exact: true,
                                  });
                                }
                                return toast.error("Error deleting post");
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
              </div>
              <p className="text-base pl-1.5">{post.description}</p>
            </CardHeader>
            <CardContent className="relative max-w-[500px] aspect-square object-contain">
              <Image
                src={post.pictureLink}
                fill
                alt={`${post.user.firstName} ${post.user.lastName} post picture`}
                priority
              />
            </CardContent>
            <CardFooter>
              <CommentSection
                postId={post.postId}
                userId={user?.user.id as string}
                fullName={user?.user.name as string}
                profilePictureUrl={user?.user.image as string}
              />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default Posts;
