import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const FriendsSuggestion = () => {
  const fakeData = [
    {
      firstName: "hirosima",
      lastName: "nakamaru",
      image: "https://github.com/shadcn.png",
      id: "1",
    },
    {
      firstName: "jennish",
      lastName: "malla",
      image: "https://github.com/shadcn.png",
      id: "2",
    },
    {
      firstName: "kartik",
      lastName: "sing",
      image: "https://github.com/shadcn.png",
      id: "3",
    },
  ];

  return (
    <div className="absolute  w-full top-full mt-2.5 z-50 container-bg-light dark:container-bg-dark">
      <ul className="flex flex-col">
        {fakeData.map((user) => (
          <li key={user.id} className="flex gap-x-2 p-3">
            <Avatar className="size-8">
              <AvatarImage src={user.image} />
            </Avatar>
            <span>
              {user.firstName[0].toLocaleUpperCase() +
                user.firstName.slice(1) +
                ` ` +
                user.lastName[0].toLocaleUpperCase() +
                user.lastName.slice(1)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsSuggestion;
