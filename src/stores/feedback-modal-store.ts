import { create } from 'zustand';

export type TFeedbackModalStore = {
  isFeedbackModalOpen: boolean;
  toggleFeedbackModal: () => void;
  setFeedbackModalOpen: (open: boolean) => void;
};

export const useFeedbackModalStore = create<TFeedbackModalStore>((set) => ({
  isFeedbackModalOpen: false,
  setFeedbackModalOpen: (open) => set({ isFeedbackModalOpen: open }),
  toggleFeedbackModal: () =>
    set((state) => ({ isFeedbackModalOpen: !state.isFeedbackModalOpen })),
}));
