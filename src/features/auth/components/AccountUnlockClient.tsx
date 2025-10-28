'use client';

import { useState } from 'react';
import AccountUnlockForm from './AccountUnlockForm';

interface AccountUnlockClientProps {
  uuid: string;
}

export default function AccountUnlockClient({
  uuid,
}: AccountUnlockClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordChange = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Validation
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

      // Success
      setSuccessMessage('Password changed successfully! Redirecting...');
      setTimeout(() => {
        // Redirect to login or dashboard
        window.location.href = '/auth/login';
      }, 2000);
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AccountUnlockForm
      onSubmit={handlePasswordChange}
      isLoading={isLoading}
      successMessage={successMessage}
      errorMessage={errorMessage}
      uuid={uuid}
    />
  );
}
