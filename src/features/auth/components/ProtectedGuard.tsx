'use client';
import TLayout from '@/types/layout.types';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAccessAndRefresh } from '@/features/auth/service/auth-service';
import { AuthMessages } from '@/features/auth/types/auth-types';
import LoadingPage from '@/components/common/Loading';
import ServerErrorUi from '@/components/common/ServerErrorUi';

const ProtectedGuard: FC<TLayout> = ({ children }) => {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    let redirected = false;
    (async () => {
      const result = await checkAccessAndRefresh();
      if (result === AuthMessages.SESSION_EXPIRED && !redirected) {
        redirected = true;
        router.replace('/');
      }
      if (result === AuthMessages.UNAUTHENTICATED && !redirected) {
        redirected = true;
        router.replace('/');
      } else {
        setStatus(result);
      }
      setLoading(false);
    })();
  }, [router]);
  if (loading && status === null) return <LoadingPage />;
  if (!loading && status === AuthMessages.SERVER_ERROR)
    return <ServerErrorUi />;
  return <>{children}</>;
};

export default ProtectedGuard;
