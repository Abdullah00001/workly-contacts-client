'use client';

import { create } from 'zustand';

interface NavigationGuardState {
  hasUnsavedChanges: boolean;
  nextRoute: string | null;
  isModalOpen: boolean;
  setUnsavedChanges: (status: boolean) => void;
  setNextRoute: (route: string | null) => void;
  setModalOpen: (status: boolean) => void;
  setCleanupFunction: (fn: (() => Promise<void>) | null) => void;
  cleanupFunction: (() => Promise<void>) | null;
  reset: () => void;
}

export const navigationGuardStore = create<NavigationGuardState>((set) => ({
  hasUnsavedChanges: false,
  nextRoute: null,
  isModalOpen: false,
  setUnsavedChanges: (status) => set({ hasUnsavedChanges: status }),
  setNextRoute: (route) => set({ nextRoute: route }),
  setModalOpen: (status) => set({ isModalOpen: status }),
  cleanupFunction: null,
  setCleanupFunction: (fn) => set({ cleanupFunction: fn }),
  reset: () =>
    set({ hasUnsavedChanges: false, nextRoute: null, isModalOpen: false }),
}));
