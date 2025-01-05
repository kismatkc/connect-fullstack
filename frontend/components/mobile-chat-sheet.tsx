import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet-no-x";
import FacebookMessengerIcon from "@/public/header/facebook-messeneger";
import ChatOrFriendsTab from "./chats-friends-tab";
import IndividualChat from "./individual-chat";
import { useMobileChatSheetStore } from "@/hooks/global-zustand-hooks";
import { ArrowLeft } from "lucide-react";

const MobileChatSheet = () => {
  const {
    openMobileChatSheet,
    setShowIndividualChat,
    showIndividualChat,
    lastTab,
    setOpenMobileChatSheet,
  } = useMobileChatSheetStore();
  return (
    <Sheet
      open={openMobileChatSheet}
      onOpenChange={() => setOpenMobileChatSheet(!openMobileChatSheet)}
    >
      <SheetTrigger asChild>
        <button
          className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark  pb-1 pr-1
                         hover:bg-gray-200 dark:hover:bg-gray-700
                         transition-all duration-200"
          onClick={() => setOpenMobileChatSheet(true)}
        >
          <FacebookMessengerIcon />
        </button>
      </SheetTrigger>
      <SheetContent className="w-[83%]  pt-3 pb-6 px-4 flex flex-col">
        {showIndividualChat && (
          <button
            className="flex justify-end items-center"
            onClick={() => {
              setShowIndividualChat(false);
            }}
          >
            <ArrowLeft size={28} />
            <span className="text-sm">{lastTab}</span>
          </button>
        )}
        {showIndividualChat ? <IndividualChat /> : <ChatOrFriendsTab />}
      </SheetContent>
    </Sheet>
  );
};

export default MobileChatSheet;
