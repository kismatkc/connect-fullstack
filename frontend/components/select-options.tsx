import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-no-chevron";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { ReactNode, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
const SelectOptions = ({
  triggerValue,
  options,
  userId,
}: {
  triggerValue: number;
  options: {
    id: string;
    firstName: string;
    lastName: string;
    profilePictureUrl: string;
  }[];
  userId: string;
}) => {
  const router = useRouter();

  return (
    <Select
      onValueChange={(value) => {
        router.push(`/${value}`);
      }}
    >
      <SelectTrigger
        disabled={!(options.length > 0) || options[0].id === userId}
      >
        {triggerValue}
      </SelectTrigger>
      <SelectContent side="right" className="focus:outline-none">
        {options.length > 0 ? (
          options.map(({ id, firstName, lastName, profilePictureUrl }) => {
            if (id === userId) return null;
            return (
              <SelectItem
                value={id}
                className="w-full flex gap-x-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                key={id}
              >
                <Avatar className="size-9 ">
                  <AvatarImage
                    src={profilePictureUrl}
                    className="rounded-full"
                  ></AvatarImage>
                </Avatar>
                <div className="flex flex-nowrap">
                  <span className="text-sm font-semibold ml-1 ">
                    {firstName}
                  </span>
                  <span className="text-sm font-semibold ml-1 ">
                    {lastName}
                  </span>
                </div>
              </SelectItem>
            );
          })
        ) : (
          <p className="p-4 text-center w-full">Be the first one to like</p>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectOptions;
