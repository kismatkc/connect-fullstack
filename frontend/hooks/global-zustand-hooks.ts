import { create } from "zustand";
interface MessengerStore {
  openSheet: boolean;
  openChatbox: boolean;
  setOpenSheet: (value: boolean) => void;
  setOpenChatbox: (value: boolean) => void;
}

export const useMessengerStore = create<MessengerStore>((set) => ({
  openSheet: false,
  openChatbox: false,
  setOpenSheet: (value) => set(() => ({ openSheet: value })),
  setOpenChatbox: (value) => set(() => ({ openChatbox: value })),
}));
