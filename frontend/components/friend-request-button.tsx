import { friendRequest } from "@/lib/axios-utils";
import { Check, UserPlus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const FriendRequestButton = ({
  requestDetails,
}: {
  requestDetails: {
    requesterId: string;
    recipientId: string;
  };
}) => {
  const [requestSent, setRequestSent] = useState(false);
  return (
    <button
      className="bg-gray-300 hover:bg-gray-400 rounded-md transition-colors flex gap-x-2 items-center px-2 py-2"
      onClick={async () => {
        const response = await friendRequest.send(requestDetails);
        if (response){ 
          toast.success("Request Sent");
          setRequestSent(true)};
      }}
    >
      {!requestSent ? <UserPlus /> : <Check />}

      <span className="text-lg">Add friend</span>
    </button>
  );
};

export default FriendRequestButton;
