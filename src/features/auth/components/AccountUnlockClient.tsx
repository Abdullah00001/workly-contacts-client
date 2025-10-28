'use client';

import { useEffect, useState } from 'react';
import AccountUnlockForm from './AccountUnlockForm';
import { useMutation } from '@tanstack/react-query';
import { TUnlockAccountByChangePasswordPayload } from '../types/recover-type';
import { UnlockAccountByChangePassword } from '../service/recover-service';

interface AccountUnlockClientProps {
  uuid: string;
}

export default function AccountUnlockClient({
  uuid,
}: AccountUnlockClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: TUnlockAccountByChangePasswordPayload) =>
      await UnlockAccountByChangePassword(payload),
    onSuccess: (data) => {
      setIsLoading(false);
      setSuccessMessage('Password changed successfully! Redirecting...');
      setTimeout(() => {
        // Redirect to login or dashboard
        window.location.href = '/auth/login';
      }, 2000);
    },
    onError: (error) => {
      setErrorMessage(error?.message);
      setIsLoading(false);
    },
  });
  const handlePasswordChange = (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (data.newPassword !== data.confirmPassword) {
      setErrorMessage('New passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (data.newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      setIsLoading(false);
      return;
    }
    mutate({ uuid, payload: { password: data.newPassword } });
  };
  useEffect(() => {
    if (isPending) {
      setIsLoading(isPending);
    }
  }, [isPending]);
  return (
    <AccountUnlockForm
      onSubmit={handlePasswordChange}
      isLoading={isLoading}
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  );
}
