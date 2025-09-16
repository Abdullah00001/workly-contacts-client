import { create } from 'zustand';

export type TLabelModalStore = {
  isCreateLabelModalOpen: boolean;
  toggleCreateLabelModal: () => void;
  setCreateLabelModalOpen: (open: boolean) => void;
  isRenameLabelModalOpen: boolean;
  toggleRenameLabelModal: () => void;
  setRenameLabelModalOpen: (open: boolean) => void;
};

export const useLabelModalStore = create<TLabelModalStore>((set) => ({
  isCreateLabelModalOpen: false,
  setCreateLabelModalOpen: (open) => set({ isCreateLabelModalOpen: open }),
  toggleCreateLabelModal: () =>
    set((state) => ({ isCreateLabelModalOpen: !state.isCreateLabelModalOpen })),
  isRenameLabelModalOpen: false,
  setRenameLabelModalOpen: (open) => set({ isRenameLabelModalOpen: open }),
  toggleRenameLabelModal: () =>
    set((state) => ({ isRenameLabelModalOpen: !state.isRenameLabelModalOpen })),
}));
