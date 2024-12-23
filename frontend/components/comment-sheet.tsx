import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
import { Ellipsis } from "lucide-react";
import Image from "next/image";

export function ViewMoreComment({
  showMoreButton,
  comments,
}: {
  showMoreButton: boolean;
  comments: {
    id: string;
    firstName: string;
    lastName: string;
    profilePictureUrl: string;
    description: string;
  }[];
}) {
  return (
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
        {comments &&
          comments.map((data) => (
            <div
              className="flex justify-between items-start  gap-x-3"
              key={data.id}
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
                  <Ellipsis className="size-6 opacity-50 cursor-pointer" />
                </div>
                <p className="grow bg-icon-bg-light dark:bg-icon-bg-dark rounded-lg text-left break-all p-3 hyphens-auto">
                  {data.description}
                </p>
              </div>
            </div>
          ))}
      </SheetContent>
    </Sheet>
  );
}
