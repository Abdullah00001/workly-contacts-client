'use client';
import TLayout from '@/types/layout.types';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAccessAndRefresh } from '@/features/auth/service/auth-service';

const ProtectedGuard: FC<TLayout> = ({ children }) => {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await checkAccessAndRefresh();
      if (!result) {
        router.replace('/'); // redirect to homepage if not authenticated
      } else {
        setIsAllowed(true); // allow rendering of children
      }
    })();
  }, [router]);
  if (!isAllowed) return null; // prevent flashing protected content

  return <>{children}</>;
};

export default ProtectedGuard;
