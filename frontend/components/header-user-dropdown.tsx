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

const HeaderUserDropDownMenu = ({}) => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link href={`/${2}`}></Link>
        <Avatar className="size-8">
          <AvatarImage src={session?.user?.image as string} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="container-bg-dark container-bg-light mt-1 mr-2">
        {/* <DropdownMenuLabel className="flex items-center gap-x-3 ">
          <Avatar className="size-7 ">
            <AvatarImage src={session?.user?.image as string} />
          </Avatar>
          <span className="text-sm font-semibold "> {session?.user?.name}</span>
        </DropdownMenuLabel> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center ">
          <Avatar className="size-7 ">
            <AvatarImage src={session?.user?.image as string} />
          </Avatar>
          <span className="text-sm font-semibold "> {session?.user?.name}</span>
        </DropdownMenuItem>
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
