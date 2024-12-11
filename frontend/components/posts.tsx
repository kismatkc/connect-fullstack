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

const Posts = () => {
  const [postData, setPostData] = useState<Post[]>([]);
  const { data: user } = useSession();
  useEffect(() => {
    (async function () {
      try {
        const userId = user?.user?.id;
        if (!userId) return;
        const newPosts: Post[] = await posts.getPosts(userId);
        // if (newPosts.length > 0) setPostData(newPosts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);
  if (!(postData.length > 0)) {
    return (
      <div className="flex flex-col dark:container-bg-dark container-bg-light gap-y-3">
        <div className="flex gap-x-1 items-center pl-2.5 pt-2">
          <Skeleton className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-10 pl-2.5" />
          <Skeleton className="w-28 h-4" />
          <Skeleton className="size-8" />
        </div>
          <Skeleton className="w-full h-60 " />
             <div className="flex gap-x-1 items-center pl-2.5 pt-2">
          <Skeleton className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-10 pl-2.5" />
          <Skeleton className="w-28 h-4 " />
        </div>
          <Skeleton className="w-full h-60 " />
      </div>
    );
  }
  return (
    <Card className="flex flex-col icon-bg-light dark:icon-bg-dark dark:container-bg-dark container-bg-light mb-4 w-full max-w-[680px]">
      <CardHeader className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <figure className="flex gap-x-2 items-center">
            <button className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark size-10 pl-2.5"></button>

            <figcaption className="flex flex-col">
              <span>Kismat kc</span>
            </figcaption>
          </figure>
          <div className="flex items-center">
            <Ellipsis />
            <X />
          </div>
        </div>
        <span>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad, in
        </span>
      </CardHeader>
      <CardContent className="relative max-w-[500px] aspect-square object-contain">
        <Image
          src="/posts/post_1.jpg"
          fill
          alt="replace with usename name and post"
          priority
        />
      </CardContent>
      <CardFooter>
        <CommentSection />
      </CardFooter>
    </Card>
  );
};

export default Posts;
