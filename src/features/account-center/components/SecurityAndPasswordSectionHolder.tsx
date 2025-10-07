'use client';
import { FC, lazy, Suspense } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import AccountCenterErrorBoundary from './AccountCenterErrorBoundary';
import { useQuery } from '@tanstack/react-query';
import SecurityAndPasswordPageSkeleton from './SecurityAndPasswordPageSkeleton';

const SecurityOverviewSection = lazy(
  () => import('@/features/account-center/components/SecurityOverviewSection')
);
const ActiveSessionSection = lazy(
  () => import('@/features/account-center/components/ActiveSessionSection')
);
const RecentActivitySection = lazy(
  () => import('@/features/account-center/components/RecentActivitySection')
);

const SecurityAndPasswordSectionHolder: FC = () => {
  return (
    <ErrorBoundary errorComponent={AccountCenterErrorBoundary}>
      <Suspense fallback={<SecurityAndPasswordPageSkeleton />}>
        <SecurityOverviewSection />
        <ActiveSessionSection />
        <RecentActivitySection />
      </Suspense>
    </ErrorBoundary>
  );
};

export default SecurityAndPasswordSectionHolder;
