"use client";
import React from "react";
import CreatePostDialog from "./create-post-dialog";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
const CreatePost = () => {
  const { data } = useSession();
  if (!data)
    return <div className="w-full flex items-center justify-center pt-3">
        <Loader2 className="size-10 animate-spin" />
    
    </div>;
  return (
    <section className="border-light mt-6 border-dark dark:container-bg-dark container-bg-light flex flex-col p-2 ">
      <div className="flex gap-x-2 p-2.5 border-b-[1px] ">
   
        <Image
          src={data?.user.image as string}
          alt={`${data?.user.name} picture `}
          width={40}
          height={40}
          className="rounded-full"
          priority
        />
        <CreatePostDialog data={data} />
      </div>
    </section>
  );
};

export default CreatePost;
