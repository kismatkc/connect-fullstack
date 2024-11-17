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

const UserProfile = ({ params }: { params: { id: number } }) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col ">
        <div className="flex flex-col items-center">
          <Image
            src={"/"}
            alt="profile picture"
            width={168}
            height={168}
            className="bg-black rounded-full"
          />
          <span className="text-3xl">Kismat kc</span>
          <span>10 friends</span>
          <div className="flex gap-x-2 ">
            {Array.from({ length: 7 }).map((item, i) => (
              <Avatar className="size-8">
                <AvatarFallback>kk</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex gap-x-2 w-full justify-center">
            <button className="bg-gray-300 hover:bg-gray-400 rounded-md transition-colors flex gap-x-2 items-center px-2 py-3">
              <UserPlus />
              <span className="text-lg">Add friend</span>
            </button>

            <button className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-md flex gap-x-2 items-center px-2 py-3">
              <FacebookMessengerIcon />
              <span className="text-lg">Message</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-left">
          <h1>Intro</h1>
          <figure className="flex gap-x-3">
            <GraduationCapIcon />
            <figcaption>Studied at Seneca College</figcaption>
          </figure>
          <figure className="flex gap-x-3">
            <HomeIcon />
            <figcaption>Lives in scarborugh.Toronto</figcaption>
          </figure>
          <figure className="flex gap-x-3">
            <Clock2Icon />
            <figcaption>Joined August 2012</figcaption>
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
