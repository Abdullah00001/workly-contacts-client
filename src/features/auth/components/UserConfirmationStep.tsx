'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

interface UserInfo {
  name: string;
  email: string;
  avatar: string;
}

interface UserConfirmationStepProps {
  userInfo: UserInfo;
  onConfirm: (isCorrectUser: boolean) => void;
}

export default function UserConfirmationStep({
  userInfo,
  onConfirm,
}: UserConfirmationStepProps) {
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
          onClick={() => onConfirm(false)}
          variant="outline"
          className="h-12 border-gray-200 hover:bg-gray-50 rounded-lg text-sm"
        >
          <X className="w-4 h-4 mr-2" />
          No, it{`'`}s not me
        </Button>
        <Button
          onClick={() => onConfirm(true)}
          className="h-12 text-white hover:opacity-90 rounded-lg text-sm"
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
