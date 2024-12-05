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

const CreatePostDialog = () => {
    const { data } = useSession();
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
    return (
        <AlertDialog open={open} onOpenChange={(change) => setOpen(change)}>
            <AlertDialogTrigger
                className="w-full border rounded-3xl py-2 px-4 
                         focus:outline-none 
                         dark:bg-gray-800 dark:border-gray-700
                         transition-colors duration-200 bg-icon-bg-light dark:bg-icon-bg-dark mr-3"
                onClick={() => setOpen(true)}
            >
                {`Whats on your mind${data?.user ? `,${data.user.name?.slice(data.user.name.lastIndexOf(" "))} ` : ""}?`}
            </AlertDialogTrigger>
            <AlertDialogContent
                className="dark:container-bg-dark container-bg-light "
                ref={dialogRef}
            >
                <AlertDialogHeader className="flex flex-row justify-between items-center">
                    <AlertDialogTitle>Create post</AlertDialogTitle>
                    <AlertDialogCancel className="border-none rounded-full">
                        X
                    </AlertDialogCancel>
                </AlertDialogHeader>
                <div className="flex flex-col gap-y-3 ">
                    <input
                        className="dark:container-bg-dark container-bg-light border-none focus:outline-none focus:outline-none p-1"
                        placeholder={`Whats on your mind${data?.user ? `,${data.user.name?.slice(0, data.user.name.lastIndexOf(" "))} ` : ""}?`}
                    />

                    <PostImageUpload />
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CreatePostDialog;
