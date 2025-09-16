import { create } from 'zustand';

export type TLogoutModalStore = {
  isLogoutModalOpen: boolean;
  toggleLogoutModal: () => void;
  setLogoutModalOpen: (open: boolean) => void;
};

export const useLogoutModalStore = create<TLogoutModalStore>((set) => ({
  isLogoutModalOpen: false,
  setLogoutModalOpen: (open) => set({ isLogoutModalOpen: open }),
  toggleLogoutModal: () =>
    set((state) => ({ isLogoutModalOpen: !state.isLogoutModalOpen })),
}));
