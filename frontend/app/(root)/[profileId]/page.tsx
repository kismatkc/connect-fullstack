"use client";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  Clock2Icon,
  GraduationCapIcon,
  HomeIcon,
  UserPlus,
} from "lucide-react";

import Posts from "@/components/posts";
import FacebookMessengerIcon from "@/public/header/facebook-messeneger";
import useGetUserProfileDetails from "@/hooks/get-user-profile-details";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { truncuateTillKeyword } from "@/lib/utils";
import { formatDate } from "date-fns";
import FriendRequestButton from "@/components/friend-request-button";

const UserProfile = ({ params }: { params: { profileId: string } }) => {
  const {
    data: user,
    error,
    isPending,
    mutate: getProfileDetails,
  } = useGetUserProfileDetails();
  const { data: session } = useSession();
  useEffect(() => {
    const profileId = params.profileId;
    if (!profileId) return;
    getProfileDetails(profileId);
  }, [session]);

  if (isPending || error)
    return (
      <div className="flex flex-col gap-y-5 p-5 w-full">
        <div className="flex justify-center w-full">
          <Skeleton className="rounded-full size-[168px] bg-gray-300" />
        </div>
        <Skeleton className="w-full h-[110px] bg-gray-300 " />
        <Skeleton className="w-full h-[110px] bg-gray-300 " />
        <Skeleton className="w-full h-[110px] bg-gray-300 " />
      </div>
    );
  if (user)
    return (
      <section className="flex flex-col">
        <div className="flex flex-col gap-y-6 px-2 pt-6">
          <div className="flex flex-col items-center gap-y-2">
            <Image
              src={user.profile_picture_url}
              alt="profile picture"
              width={168}
              height={168}
              className="bg-black rounded-full"
            />
            <div className="flex flex-nowrap gap-x-1.5 font-bold">
              <span className="text-3xl">{user.first_name}</span>
              <span className="text-3xl">{user.last_name}</span>
            </div>

            <span className="font-medium">10 Friends</span>
            <div className="flex gap-x-2 ">
              {Array.from({ length: 7 }).map((item, i) => (
                <Avatar className="size-8" key={i}>
                  <AvatarImage src={user.profile_picture_url} />
                </Avatar>
              ))}
            </div>
            <div className="flex gap-x-4 w-full justify-center p-2">
              {session && params && (
                <FriendRequestButton
                  requestDetails={{
                    requesterId: session.user.id,
                    recipientId: params.profileId,
                  }}
                />
              )}

              <button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-md flex gap-x-2 items-center px-2 py-2">
                <FacebookMessengerIcon />
                <span className="text-lg">Message</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-left font-semi-bold pb-4">
            <h1 className="font-bold p-2">Intro</h1>
            <figure className="flex gap-x-3 p-2">
              <GraduationCapIcon />

              <figcaption>
                {truncuateTillKeyword(user.college, "College")}
              </figcaption>
            </figure>
            <figure className="flex gap-x-3 p-2">
              <HomeIcon />
              <figcaption>
                {truncuateTillKeyword(user.city, "Canada")}
              </figcaption>
            </figure>
            <figure className="flex gap-x-3 p-2">
              <Clock2Icon />
              <figcaption>
                {formatDate(user.created_at, "'Joined' MMM dd, yyyy")}
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="flex flex-col">
          <Posts />
          <Posts />
          <Posts />
        </div>
      </section>
    );
};

export default UserProfile;
