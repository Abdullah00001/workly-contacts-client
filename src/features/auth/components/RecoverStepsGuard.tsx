'use client';

import type TLayout from '@/types/layout.types';
import { type FC, useEffect, useState } from 'react';
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

      if (!result) {
        if (!redirected) {
          redirected = true;
          router.replace('/auth/recover?step=initiate');
        }
        setLoading(false);
        return;
      }

      if (result === AuthMessages.SESSION_EXPIRED && !redirected) {
        redirected = true;
        router.replace('/auth/recover?step=initiate');
      } else if (result === AuthMessages.UNAUTHENTICATED && !redirected) {
        redirected = true;
        router.replace('/auth/recover?step=initiate');
      } else {
        setStatus(result);
      }
      setLoading(false);
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-muted-foreground">Verifying session...</div>
      </div>
    );
  }

  if (status === AuthMessages.SERVER_ERROR || !status) {
    return null;
  }

  return <>{children}</>;
};

export const RecoverStepTwoGuard: FC<TLayout> = ({ children }) => {
  const router = useRouter();
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let redirected = false;
    (async () => {
      const result = await CheckStepTwoGuardService();

      if (!result) {
        if (!redirected) {
          redirected = true;
          router.replace('/auth/recover?step=initiate');
        }
        setLoading(false);
        return;
      }

      if (result === AuthMessages.SESSION_EXPIRED && !redirected) {
        redirected = true;
        router.replace('/auth/recover?step=initiate');
      } else if (result === AuthMessages.UNAUTHENTICATED && !redirected) {
        redirected = true;
        router.replace('/auth/recover?step=initiate');
      } else {
        setStatus(result);
      }
      setLoading(false);
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-muted-foreground">Verifying session...</div>
      </div>
    );
  }

  if (status === AuthMessages.SERVER_ERROR || !status) {
    return null;
  }

  return <>{children}</>;
};

export const RecoverStepThreeGuard: FC<TLayout> = ({ children }) => {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let redirected = false;
    (async () => {
      const result = await CheckStepThreeGuardService();

      if (!result) {
        if (!redirected) {
          redirected = true;
          router.replace('/auth/recover?step=initiate');
        }
        setLoading(false);
        return;
      }

      if (result === AuthMessages.SESSION_EXPIRED && !redirected) {
        redirected = true;
        router.replace('/auth/recover?step=initiate');
      } else if (result === AuthMessages.UNAUTHENTICATED && !redirected) {
        redirected = true;
        router.replace('/auth/recover?step=initiate');
      } else {
        setStatus(result);
      }
      setLoading(false);
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-muted-foreground">Verifying session...</div>
      </div>
    );
  }

  if (status === AuthMessages.SERVER_ERROR || !status) {
    return null;
  }

  return <>{children}</>;
};
