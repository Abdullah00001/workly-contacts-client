'use client';
import { FC, lazy, Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import AccountCenterErrorBoundary from './AccountCenterErrorBoundary';
import { useQuery } from '@tanstack/react-query';
import SecurityAndPasswordPageSkeleton from './SecurityAndPasswordPageSkeleton';
import { SecurityOverviewData } from '../services/personal-info-services';

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
  const { isPending, data } = useQuery({
    queryFn: async () => await SecurityOverviewData(),
    queryKey: ['security_overview'],
  });
  useEffect(() => {
    console.log(data?.accountCreatedAt);
  }, [data]);
  const isLoading = isPending;
  return (
    <ErrorBoundary errorComponent={AccountCenterErrorBoundary}>
      {isLoading ? (
        <SecurityAndPasswordPageSkeleton />
      ) : (
        <Suspense fallback={<SecurityAndPasswordPageSkeleton />}>
          <SecurityOverviewSection
            accountCreatedAt={data?.accountCreatedAt}
            lastLoginBrowser={data?.lastLoginBrowser}
            lastLoginLocation={data?.lastLoginLocation}
            lastLoginOs={data?.lastLoginOs}
            lastPasswordChange={data?.lastPasswordChange}
            lastLoginTime={data?.lastLoginTime}
          />
          <ActiveSessionSection />
          <RecentActivitySection />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};

export default SecurityAndPasswordSectionHolder;
