import { FC, Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import SecurityPageSkeleton from '../components/ui/skeletons/SecurityPageSkeleton';
import ErrorFallback from '../components/ui/ErrorFallback';
const SecurityOverview = lazy(
  () => import('../features/accountscenter/components/SecurityOverview')
);
const ActiveSessions = lazy(
  () => import('../features/accountscenter/components/ActiveSessions')
);
const RecentSecurityActivity = lazy(
  () => import('../features/accountscenter/components/RecentSecurityActivity')
);

const SecurityAndPassword: FC = () => {
  return (
    <div className="px-4 min-h-screen w-full">
      <div className="mt-4 w-auto">
        <h1 className="font-semibold text-[24px] text-wrap">
          Keep your Account safe and secure
        </h1>
        <p className="text-[16px]  text-wrap mt-1 font-normal text-gray-300">
          Update your password, monitor logged-in devices, and review recent
          activity to keep your account safe and under your control.
        </p>
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<SecurityPageSkeleton />}>
          <SecurityOverview />
          <ActiveSessions />
          <RecentSecurityActivity />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default SecurityAndPassword;
