'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import type { TOtpStepProps } from '@/features/auth/types/recover-type';
import {
  VerifyOtpService,
  ResendOtpService,
} from '@/features/auth/service/recover-service';

export default function OtpStep({ onNavigate }: TOtpStepProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex((digit) => !digit);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    if (!otp.every((digit) => digit)) return;

    setIsLoading(true);
    setError('');

    try {
      const otpString = otp.join('');
      const response = await VerifyOtpService({ otp: otpString });

      if (response.success) {
        onNavigate('reset_password');
      } else {
        setError(response.message || 'Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await ResendOtpService();
      setResendTimer(60);
      setError('');
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    }
  };

  const canProceed = otp.every((digit) => digit);

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl sm:text-3xl text-foreground">
          Verify Your Identity
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          We sent a 6-digit code to your email
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center gap-2 sm:gap-3">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3]"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button
          onClick={handleVerify}
          disabled={!canProceed || isLoading}
          className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: '#3F3FF3' }}
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </Button>

        <div className="text-center text-sm">
          {resendTimer > 0 ? (
            <p className="text-muted-foreground">
              Resend code in{' '}
              <span className="font-medium text-foreground">
                {resendTimer}s
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm hover:text-opacity-80 font-medium cursor-pointer underline-offset-4 hover:underline"
              style={{ color: '#3F3FF3' }}
            >
              Resend Code
            </button>
          )}
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
    </div>
  );
}
