import { create } from 'zustand';

export type TImportSnackbarStore = {
  openImportSnackbar: boolean;
  isPending: boolean;
  fileName: string;
  setFileName: (payload: string) => void;
  setIsPending: (open: boolean) => void;
  toggleOpenImportSnackbar: () => void;
  setOpenImportSnackbar: (open: boolean) => void;
};

export const useImportSnackbarStore = create<TImportSnackbarStore>((set) => ({
  isPending: false,
  fileName: '',
  setFileName: (payload) => set({ fileName: payload }),
  setIsPending: (open) => set({ isPending: open }),
  openImportSnackbar: false,
  setOpenImportSnackbar: (open) => set({ openImportSnackbar: open }),
  toggleOpenImportSnackbar: () =>
    set((state) => ({ openImportSnackbar: !state.openImportSnackbar })),
}));
