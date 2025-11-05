import { create } from 'zustand';

export type THamburgerStore = {
  isHamburgerOpen: boolean;
  toggleHamburger: () => void;
  setHamburgerOpen: (open: boolean) => void;
};

export const useHamburgerStore = create<THamburgerStore>((set) => ({
  isHamburgerOpen: false,
  setHamburgerOpen: (open) => set({ isHamburgerOpen: open }),
  toggleHamburger: () =>
    set((state) => ({ isHamburgerOpen: !state.isHamburgerOpen })),
}));
