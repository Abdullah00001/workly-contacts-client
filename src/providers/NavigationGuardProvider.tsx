'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { navigationGuardStore } from '@/stores/navigation-guard-store';
import DiscardModal from '@/components/common/DiscardModal';

export default function NavigationGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const pendingNavigation = useRef<(() => void) | null>(null);

  const {
    nextRoute,
    hasUnsavedChanges,
    isModalOpen,
    setModalOpen,
    setUnsavedChanges,
    reset,
    cleanupFunction,
  } = navigationGuardStore();

  // --- ✅ Handle link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;

      const url = new URL(href, window.location.origin);
      const targetPath = url.pathname + url.search;

      if (hasUnsavedChanges && targetPath !== pathname) {
        e.preventDefault();
        e.stopPropagation();

        // Save callback to run if user confirms discard
        pendingNavigation.current = () => router.push(targetPath);
        setModalOpen(true);
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [hasUnsavedChanges, pathname]);

  // --- ✅ Intercept browser "Back" navigation
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.stopImmediatePropagation();

        pendingNavigation.current = () => window.history.back();
        setModalOpen(true);
        window.history.pushState(null, '', pathname); // cancel actual pop
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [hasUnsavedChanges, pathname]);

  // --- ✅ Warn on tab close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // --- ✅ Replace router.push() and router.back()
  useEffect(() => {
    const originalPush = router.push;
    const originalBack = router.back;

    (router as any).safePush = (url: string) => {
      if (hasUnsavedChanges) {
        pendingNavigation.current = () => originalPush(url);
        setModalOpen(true);
      } else {
        originalPush(url);
      }
    };

    (router as any).safeBack = () => {
      if (hasUnsavedChanges) {
        pendingNavigation.current = () => originalBack();
        setModalOpen(true);
      } else {
        originalBack();
      }
    };

    return () => {
      (router as any).safePush = originalPush;
      (router as any).safeBack = originalBack;
    };
  }, [hasUnsavedChanges]);

  // --- ✅ Modal Handlers
  const handleDiscard = async () => {
    if (cleanupFunction) {
      try {
        await cleanupFunction();
      } catch (error) {
        console.error('Cleanup failed:', error);
      }
    }
    setUnsavedChanges(false);
    setModalOpen(false);
    if (nextRoute === 'back') {
      router.back();
    }
    const fn = pendingNavigation.current;
    pendingNavigation.current = null;
    if (fn) fn();
    reset();
  };

  const handleCancel = () => {
    pendingNavigation.current = null;
    setModalOpen(false);
  };

  return (
    <>
      {children}
      <DiscardModal
        open={isModalOpen}
        onDiscard={handleDiscard}
        onCancel={handleCancel}
      />
    </>
  );
}
