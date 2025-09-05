'use client';

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function SuccessStep() {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl text-foreground">
          Password Reset Successful!
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Your password has been successfully reset. You can now sign in with
          your new password.
        </p>
      </div>

      <Button
        asChild
        className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer"
        style={{ backgroundColor: '#3F3FF3' }}
      >
        <Link href="/auth/login">Sign In Now</Link>
      </Button>
    </div>
  );
}
