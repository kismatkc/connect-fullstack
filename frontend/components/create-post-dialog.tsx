"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import PostImageUpload from "@/components/profile-upload";
import { useEffect, useState, useRef } from "react";
import { posts } from "@/lib/axios-utils";
import { PostDetailsType } from "@/types";
import { toast } from "sonner";
import { UUID } from "crypto";
import { useQueryClient } from "@tanstack/react-query";

const CreatePostDialog = () => {
  const { data } = useSession();
  const queryClient = useQueryClient();

  const [description, setDescription] = useState<string>("");
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;
      if (!dialogRef.current?.contains(target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  const handleSubmit = async () => {
    try {
      if (!(description || pictureFile)) return;

      const postDetails: PostDetailsType = {
        description,
        picture: pictureFile as File,
        userId: data?.user.id as UUID,
      };
      const response = await posts.createPost(postDetails);
      if (!response) return toast.error("Post creation failed");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      toast.success("Post created");
      setDescription("");
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={(change) => setOpen(change)}>
      <AlertDialogTrigger
        className="w-full border rounded-3xl py-2 px-4 
                         focus:outline-none 
                         dark:bg-gray-800 dark:border-gray-700
                         transition-colors duration-200 bg-icon-bg-light dark:bg-icon-bg-dark mr-3"
        onClick={() => setOpen(true)}
      >
        {`Whats on your mind${
          data?.user
            ? `,${data.user.name?.slice(data.user.name.lastIndexOf(" "))}`
            : ""
        }?`}
      </AlertDialogTrigger>
      <AlertDialogContent
        className="dark:container-bg-dark container-bg-light rounded-lg flex flex-col  "
        ref={dialogRef}
      >
        <AlertDialogHeader className="flex flex-row justify-between items-center">
          <AlertDialogTitle className="p-1">Create post</AlertDialogTitle>
          <AlertDialogCancel className="border-none rounded-full  bg-icon-bg-light dark:bg-icon-bg-dark ">
            X
          </AlertDialogCancel>
        </AlertDialogHeader>
        <div className="flex flex-col gap-y-3 ">
          <input
            className="dark:container-bg-dark bg-background border-none focus:outline-none  p-1"
            placeholder={`Whats on your mind${
              data?.user
                ? `,${data.user.name?.slice(
                    0,
                    data.user.name.lastIndexOf(" ")
                  )}`
                : ""
            }?`}
            value={description}
            onChange={(e) => {
              const newValue = e.target.value;

              setDescription(newValue);
            }}
          />

          <PostImageUpload
            onPostPictureChange={(picture: File | null) => {
              setPictureFile(picture);
            }}
          />
        </div>

        <button
          className={`rounded-sm p-2  ${
            !(pictureFile || description)
              ? "bg-gray-400"
              : "bg-green-400 hover:bg-green-500 "
          }`}
          onClick={() => {
            if (pictureFile || description) {
              return handleSubmit();
            }

            toast.error("Please provide either a description or a picture");
          }}
        >
          Upload
        </button>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreatePostDialog;
