"use client";
import { Ellipsis, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import CommentSection from "./comment-section";
import { useEffect, useState } from "react";
import { Post } from "@/types";
import { posts } from "@/lib/axios-utils";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { toast } from "sonner";
import useGetPosts from "@/hooks/get-posts";
import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";

const Posts = () => {
  const { data: user } = useSession();

  const { data: postData, isPending, error } = useGetPosts();
  const queryClient = useQueryClient();

  if (isPending || error || !postData || !(postData.length > 0)) {
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
                    <DropdownMenuTrigger>
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent  >
                      <div className="flex gap-x-1 jusitfy-between">
                        <span>Delete</span>
                        
                      <X
                        onClick={async () => {
                          try {
                            const postId = post.postId;
                            if (!postId) return;
                            const response = await posts.deletePost(postId);
                            if (response) {
                              toast.success("Post deleted successfully");
                              const userId = user?.user?.id;
                              if (!userId) return;
                              return queryClient.invalidateQueries({
                                queryKey: ["posts"],
                              });
                            }
                            return toast.error("Error deleting post");
                          } catch (error) {}
                        }}
                      />
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
              <CommentSection />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default Posts;
