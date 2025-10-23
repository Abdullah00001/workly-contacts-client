import { create } from 'zustand';

type TFileValidationError = {
  row?: number;
  field: string;
  message: string;
  card?: number;
};

export type TImportSnackbarStore = {
  errorMessage: string;
  setErrorMessage: (payload: string) => void;
  errors: TFileValidationError[];
  setErrors: (payload: TFileValidationError[]) => void;
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
  errorMessage: '',
  errors: [],
  setErrors: (payload) => set({ errors: payload }),
  setErrorMessage: (payload) => set({ errorMessage: payload }),
  setFileName: (payload) => set({ fileName: payload }),
  setIsPending: (open) => set({ isPending: open }),
  openImportSnackbar: false,
  setOpenImportSnackbar: (open) => set({ openImportSnackbar: open }),
  toggleOpenImportSnackbar: () =>
    set((state) => ({ openImportSnackbar: !state.openImportSnackbar })),
}));
