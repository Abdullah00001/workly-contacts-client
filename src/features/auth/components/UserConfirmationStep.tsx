'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, X } from 'lucide-react';
import Link from 'next/link';
import type {
  TUserConfirmationStepProps,
  TUserInfo,
} from '@/features/auth/types/recover-type';
import { RecoverUserInfoService } from '@/features/auth/service/recover-service';

export default function UserConfirmationStep({
  onNavigate,
}: TUserConfirmationStepProps) {
  const [userInfo, setUserInfo] = useState<TUserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await RecoverUserInfoService();

        if (response && response.email) {
          setUserInfo({
            name: response.name || 'User',
            email: response.email,
            avatar: response.avatar || '/diverse-user-avatars.png',
          });
        } else {
          // No user info, redirect to initiate
          onNavigate('initiate');
        }
      } catch (err) {
        setError('Failed to load user information');
        // Redirect to initiate on error
        setTimeout(() => onNavigate('initiate'), 2000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [onNavigate]);

  const handleConfirm = (isCorrectUser: boolean) => {
    if (isCorrectUser) {
      onNavigate('verify_otp');
    } else {
      onNavigate('initiate');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-muted-foreground">Loading user information...</div>
      </div>
    );
  }

  if (error || !userInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
        <div className="text-red-500">
          {error || 'Failed to load user information'}
        </div>
        <Button onClick={() => onNavigate('initiate')} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl sm:text-3xl text-foreground">Is this you?</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Please confirm this is your account.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4 p-4 sm:p-6 border rounded-lg">
        <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
          <AvatarImage
            src={userInfo.avatar || '/placeholder.svg'}
            alt={userInfo.name}
          />
          <AvatarFallback className="text-base sm:text-lg">
            {userInfo.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="text-center space-y-1">
          <h3 className="font-semibold text-base sm:text-lg break-words">
            {userInfo.name}
          </h3>
          <p className="text-muted-foreground text-sm break-all">
            {userInfo.email}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
        <Button
          onClick={() => handleConfirm(false)}
          variant="outline"
          className="h-12 border-gray-200 hover:text-gray-600 hover:!bg-gray-50 rounded-lg text-sm cursor-pointer"
        >
          <X className="w-4 h-4 mr-2" />
          No, it{`'`}s not me
        </Button>
        <Button
          onClick={() => handleConfirm(true)}
          className="h-12 text-white hover:opacity-90 rounded-lg text-sm cursor-pointer"
          style={{ backgroundColor: '#3F3FF3' }}
        >
          <Check className="w-4 h-4 mr-2" />
          Yes, it{`'`}s me
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Remember your password?{' '}
        <Link
          href="/auth/login"
          className="text-sm hover:text-opacity-80 font-medium cursor-pointer underline-offset-4 hover:underline"
          style={{ color: '#3F3FF3' }}
        >
          Sign in instead
        </Link>
      </div>
    </div>
  );
}
