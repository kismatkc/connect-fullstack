import { EnumLike } from "zod";
import { create } from "zustand";
interface MobileChatSheetStore {
  openMobileChatSheet: boolean;
  showIndividualChat: boolean;
  lastTab: string | null;
  receiveruser: {
    id: string;
    name: string;
    profilePicture: string;
    status: "online" | "offline";
  } | null;
  setLastTab: (lastTab: string) => void;

  setOpenMobileChatSheet: (value: boolean) => void;
  setShowIndividualChat: (value: boolean) => void;
  setUser: (
    receiveruser: {
      id: string;
      name: string;
      profilePicture: string;
      status: "online" | "offline";
    } | null
  ) => void;
}

export const useMobileChatSheetStore = create<MobileChatSheetStore>((set) => ({
  openMobileChatSheet: false,
  showIndividualChat: false,
  receiveruser: null,
  lastTab: null,
  setUser: (receiveruser) => set(() => ({ receiveruser })),
  setLastTab: (lastTab) => set(() => ({ lastTab })),

  setOpenMobileChatSheet: (value) =>
    set(() => ({ openMobileChatSheet: value })),
  setShowIndividualChat: (value) => set(() => ({ showIndividualChat: value })),
}));
