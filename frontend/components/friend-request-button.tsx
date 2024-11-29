import { friendRequest, notifications } from "@/lib/axios-utils";
import { Check, UserPlus, ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import FriendsDropDownButton from "./friends-dropdon-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const FriendRequestButton = ({
  requestDetails,
  status,
  id,
  reset,
}: {
  requestDetails: {
    requesterId: string;
    recipientId: string;
  };
  status: string;
  id: string;
  reset: () => void;
}) => {
  const [requestSent, setRequestSent] = useState(false);
  const [requestSentSuccess, setRequestSentSuccess] = useState<string>("");

  if (status === "pending") {
    return (
      <FriendsDropDownButton description="Request sent" id={id} reset={reset} />
    );
  }
  if (status === "accepted") {
    return (
      <FriendsDropDownButton description="Friends" id={id} reset={reset} />
    );
  }

  return (
    <div className="flex bg-gray-300 hover:bg-gray-400 transition-colors ">
      <button
        className="rounded-md flex gap-x-2 items-center px-2 py-2 z-[30]"
        disabled={requestSent}
        onClick={async () => {
          const response = await friendRequest.send(requestDetails);
          if (response) {
            toast.success("Request Sent");
            setRequestSent(true);
            console.log(response, "isnide the button");
            setRequestSentSuccess(response.id as string);
          }
        }}
      >
        {!requestSent ? (
          <>
            <UserPlus />
            <span className="text-lg">Add friend</span>
          </>
        ) : (
          <>
            <Check />
            <span className="text-lg">Request sent</span>
          </>
        )}
      </button>
      {requestSent && (
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-md \-ml-3 p-2 z-[29]">
            <ChevronDownIcon className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-gray-300 text-left pl-2 min-w-[10rem]"
            asChild
            sideOffset={18}
          >
            <button
              className="bg-gray-300 hover:bg-gray-400 "
              onClick={async () => {
                if (!requestSentSuccess) return;

                const success = await notifications.deletePendingRequest(
                  requestSentSuccess
                );
                if (success) {
                  setRequestSent(false);
                  setRequestSentSuccess("");
                  return toast.success("Friend request deleted");
                }

                toast.error("Friend request not deleted,Please try again");
              }}
            >
              Cancel Request
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default FriendRequestButton;
