'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import type {
  TEmailStepProps,
  TFindUserPayload,
} from '@/features/auth/types/recover-type';
import { useMutation } from '@tanstack/react-query';
import { FindUserService } from '../service/recover-service';
import { toast } from 'sonner';

export default function EmailStep({ onNavigate }: TEmailStepProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const canProceed = email.includes('@') && email.includes('.');
  const { isPending, mutate } = useMutation({
    mutationFn: async (payload: TFindUserPayload) =>
      await FindUserService(payload),
    onSuccess: (data) => {
      toast('User found', { closeButton: false });
      setTimeout(() => {
        onNavigate('identify');
      }, 1000);
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  const handleSubmit = () => {
    if (!canProceed) return;
    mutate({ email });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl sm:text-3xl text-foreground">
          Forgot Password?
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Enter your email address to find your account.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="user@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="h-12 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3]"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!canProceed || isPending}
          className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: '#3F3FF3' }}
        >
          {isPending ? 'Finding Account...' : 'Find Account'}
        </Button>

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
    </div>
  );
}
