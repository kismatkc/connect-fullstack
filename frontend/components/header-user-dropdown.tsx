import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { HelpCircleIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const HeaderUserDropDownMenu = ({}) => {
  const { data: session } = useSession();
  const [openDropdown, setOpenDrowdown] = useState(false);

  return (
    <DropdownMenu
      open={openDropdown}
      onOpenChange={(val) => setOpenDrowdown(val)}
    >
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8">
          <AvatarImage src={session?.user?.image as string} />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="container-bg-dark container-bg-light mt-1 mr-2">
        <DropdownMenuSeparator />
        <Link href={`/${session?.user.id}`} className=" flex items-center ">
          <DropdownMenuItem
            onClick={() => setOpenDrowdown(false)}
            className="w-full"
          >
            <Avatar className="size-7 ">
              <AvatarImage src={session?.user?.image as string} />
            </Avatar>
            <span className="text-sm font-semibold ml-1 ">
              {session?.user.name &&
                session.user.name[0].toUpperCase() +
                  session.user.name.toLocaleLowerCase().slice(1)}
            </span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center ">
          <button
            className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark  
                         hover:bg-gray-200 dark:hover:bg-gray-700
                         transition-all duration-200 size-8  flex items-center justify-center  "
          >
            <HelpCircleIcon className="scale-110" />
          </button>
          <span className="text-sm font-semibold">Help & support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center "
          onClick={() => {
            signOut();
          }}
        >
          <button
            className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark  
                         hover:bg-gray-200 dark:hover:bg-gray-700
                         transition-all duration-200 size-8  flex items-center justify-center  "
          >
            <LogOutIcon className="scale-110" />
          </button>
          <span className="text-sm font-semibold">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderUserDropDownMenu;
{
  /* href={`/${session?.user.name?.replaceAll(/ /g, "").toLowerCase()}`} */
}
