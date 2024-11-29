import { Check, ChevronDownIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { notifications } from "@/lib/axios-utils";
import { useState } from "react";

const FriendsDropDownButton = ({
    description,
    id,
    reset,
}: {
    description: string;
    id: string;
    reset: () => void;
}) => {
    return (
        <DropdownMenu>
            <button className="bg-gray-300  rounded-md transition-colors flex gap-x-2 items-center px-2 py-2">
                <Check />
                <span className="text-lg">{description}</span>
                <DropdownMenuTrigger>
                    <ChevronDownIcon className="w-4 h-4" />
                </DropdownMenuTrigger>
            </button>

            <DropdownMenuContent
                className={`bg-gray-300  min-w-[6.5rem] text-left pl-2 ${!(description === "Friends") && "min-w-[10rem]"}`}
                asChild
                sideOffset={18}
            >
                <button
                    className="bg-gray-300 hover:bg-gray-400 "
                    onClick={async () => {
                        const success =
                            await notifications.deletePendingRequest(id);
                        if (success) {
                            reset();
                            return toast.success("Friend request deleted");
                        }

                        toast.error(
                            "Friend Requets not deleted,Please try again",
                        );
                    }}
                >
                    {description === "Friends" ? "Unfriend" : "Cancel Request"}
                </button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default FriendsDropDownButton;
