import { create } from "zustand";
interface MobileChatSheetStore {
  openMobileChatSheet: boolean;
  showIndividualChat: boolean;
  user: {
    id: string;
    name: string;
    profilePicture: string;
  } | null;
  setOpenMobileChatSheet: (value: boolean) => void;
  setShowIndividualChat: (value: boolean) => void;
  setUser: (
    user: {
      id: string;
      name: string;
      profilePicture: string;
    } | null
  ) => void;
}

export const useMobileChatSheetStore = create<MobileChatSheetStore>((set) => ({
  openMobileChatSheet: false,
  showIndividualChat: false,
  user: null,
  setUser: (user) => set(() => ({ user })),
  setOpenMobileChatSheet: (value) =>
    set(() => ({ openMobileChatSheet: value })),
  setShowIndividualChat: (value) => set(() => ({ showIndividualChat: value })),
}));
