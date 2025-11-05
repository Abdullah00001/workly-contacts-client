import { create } from 'zustand';

export type TImportExportModalStore = {
  isImportModalOpen: boolean;
  toggleImportModal: () => void;
  setImportModalOpen: (open: boolean) => void;
  isExportModalOpen: boolean;
  toggleExportModal: () => void;
  setExportModalOpen: (open: boolean) => void;
  isPrintModalOpen: boolean;
  togglePrintModal: () => void;
  setPrintModalOpen: (open: boolean) => void;
};

/**
 * This Hooks For Provide Import Export Feature Related Global States
 **/
export const useImportExportModalStore = create<TImportExportModalStore>(
  (set) => ({
    isImportModalOpen: false,
    setImportModalOpen: (open) => set({ isImportModalOpen: open }),
    toggleImportModal: () =>
      set((state) => ({ isImportModalOpen: !state.isImportModalOpen })),
    isExportModalOpen: false,
    setExportModalOpen: (open) => set({ isExportModalOpen: open }),
    toggleExportModal: () =>
      set((state) => ({ isExportModalOpen: !state.isExportModalOpen })),
    isPrintModalOpen: false,
    setPrintModalOpen: (open) => set({ isPrintModalOpen: open }),
    togglePrintModal: () =>
      set((state) => ({ isPrintModalOpen: !state.isPrintModalOpen })),
  })
);
