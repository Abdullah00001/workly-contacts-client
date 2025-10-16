'use client';

import { create } from 'zustand';

interface NavigationGuardState {
  hasUnsavedChanges: boolean;
  nextRoute: string | null;
  isModalOpen: boolean;
  setUnsavedChanges: (status: boolean) => void;
  setNextRoute: (route: string | null) => void;
  setModalOpen: (status: boolean) => void;
  reset: () => void;
}

export const navigationGuardStore = create<NavigationGuardState>((set) => ({
  hasUnsavedChanges: false,
  nextRoute: null,
  isModalOpen: false,
  setUnsavedChanges: (status) => set({ hasUnsavedChanges: status }),
  setNextRoute: (route) => set({ nextRoute: route }),
  setModalOpen: (status) => set({ isModalOpen: status }),
  reset: () =>
    set({ hasUnsavedChanges: false, nextRoute: null, isModalOpen: false }),
}));
