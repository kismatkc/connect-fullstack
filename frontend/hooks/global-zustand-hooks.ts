import { create } from 'zustand';
interface MessengerStore {
    open: boolean,
    setOpen: (value: boolean) => void
}



export const useMessengerStore = create<MessengerStore>((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value }))
})) 