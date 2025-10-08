'use client';
import { FC, lazy, Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import AccountCenterErrorBoundary from './AccountCenterErrorBoundary';
import { useQuery } from '@tanstack/react-query';
import SecurityAndPasswordPageSkeleton from './SecurityAndPasswordPageSkeleton';
import {
  ActiveSessions,
  RecentActivities,
  SecurityOverviewData,
} from '../services/personal-info-services';

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
  const { isPending: isSecurityOverviewPending, data: securityOverViewData } =
    useQuery({
      queryFn: async () => await SecurityOverviewData(),
      queryKey: ['security_overview'],
    });
  const { isPending: isActiveSessionsPending, data: activeSessionsData } =
    useQuery({
      queryFn: async () => await ActiveSessions(),
      queryKey: ['active_sessions'],
    });
  const { isPending: isRecentActivityDataPending, data: recentActivities } =
    useQuery({
      queryFn: async () => await RecentActivities(),
      queryKey: ['recent_activities'],
    });
  const isLoading =
    isSecurityOverviewPending ||
    isActiveSessionsPending ||
    isRecentActivityDataPending;
  return (
    <ErrorBoundary errorComponent={AccountCenterErrorBoundary}>
      {isLoading ? (
        <SecurityAndPasswordPageSkeleton />
      ) : (
        <Suspense fallback={<SecurityAndPasswordPageSkeleton />}>
          <SecurityOverviewSection
            accountCreatedAt={securityOverViewData?.accountCreatedAt}
            lastLoginBrowser={securityOverViewData?.lastLoginBrowser}
            lastLoginLocation={securityOverViewData?.lastLoginLocation}
            lastLoginOs={securityOverViewData?.lastLoginOs}
            lastPasswordChange={securityOverViewData?.lastPasswordChange}
            lastLoginTime={securityOverViewData?.lastLoginTime}
          />
          <ActiveSessionSection sessions={activeSessionsData} />
          <RecentActivitySection activities={recentActivities} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};

export default SecurityAndPasswordSectionHolder;
