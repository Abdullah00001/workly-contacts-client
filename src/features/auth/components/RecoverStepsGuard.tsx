'use client';

import TLayout from '@/types/layout.types';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckStepOneGuardService,
  CheckStepThreeGuardService,
  CheckStepTwoGuardService,
} from '@/features/auth/service/recover-service';
import { AuthMessages } from '@/features/auth/types/auth-types';

export const RecoverStepOneGuard: FC<TLayout> = ({ children }) => {
  const router = useRouter();
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    let redirected = false;
    (async () => {
      const result = await CheckStepOneGuardService();
      if (result === AuthMessages.SESSION_EXPIRED && !redirected) {
        redirected = true;
        router.replace('/auth/recover?step=initiate');
      }
      if (result === AuthMessages.UNAUTHENTICATED && !redirected) {
        redirected = true;
        router.replace('/auth/recover?step=initiate');
      } else {
        setStatus(result);
      }
      setLoading(false);
    })();
  }, [router]);
  if (!loading && status === AuthMessages.SERVER_ERROR) {
    return <div>Loading...</div>;
  }
  return <div>{children}</div>;
};

export const RecoverStepTwoGuard: FC<TLayout> = ({ children }) => {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    let redirected = false;
    (async () => {
      const result = await CheckStepTwoGuardService();
      if (result === AuthMessages.SESSION_EXPIRED && !redirected) {
        redirected = true;
        router.replace('/auth/recover?step=initiate');
      }
      if (result === AuthMessages.UNAUTHENTICATED && !redirected) {
        redirected = true;
        router.replace('/auth/recover?step=initiate');
      } else {
        setStatus(result);
      }
      setLoading(false);
    })();
  }, [router]);
  if (!loading && status === AuthMessages.SERVER_ERROR) {
    return <div>Loading...</div>;
  }
  return <div>{children}</div>;
};

export const RecoverStepThreeGuard: FC<TLayout> = ({ children }) => {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    let redirected = false;
    (async () => {
      const result = await CheckStepThreeGuardService();
      if (result === AuthMessages.SESSION_EXPIRED && !redirected) {
        redirected = true;
        router.replace('/auth/recover?step=initiate');
      }
      if (result === AuthMessages.UNAUTHENTICATED && !redirected) {
        redirected = true;
        router.replace('/auth/recover?step=initiate');
      } else {
        setStatus(result);
      }
      setLoading(false);
    })();
  }, [router]);
  if (!loading && status === AuthMessages.SERVER_ERROR) {
    return <div>Loading...</div>;
  }
  return <div>{children}</div>;
};
