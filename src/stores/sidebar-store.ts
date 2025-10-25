import { create } from 'zustand';

export type TSidebarStore = {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
};

export const useSidebarStore = create<TSidebarStore>((set) => ({
  isOpen: true, // default state,
  setOpen: (open) => set({ isOpen: open }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
