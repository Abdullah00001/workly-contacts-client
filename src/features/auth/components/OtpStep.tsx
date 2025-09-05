'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface OtpStepProps {
  email: string;
  onVerify: () => void;
}

export default function OtpStep({ email, onVerify }: OtpStepProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const canProceed = otp.every((digit) => digit !== '');

  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError(false);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        // Clear current field
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous field and clear it
        newOtp[index - 1] = '';
        setOtp(newOtp);
        otpRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || '';
    }

    setOtp(newOtp);

    // Focus the next empty field or the last field
    const nextEmptyIndex = newOtp.findIndex((digit) => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    otpRefs.current[focusIndex]?.focus();
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return;

    // Simulate OTP verification
    if (otpValue === '123456') {
      onVerify();
    } else {
      setOtpError(true);
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl sm:text-3xl text-foreground">
          Enter Verification Code
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          We{`'`}ve sent a 6-digit code to {email}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center gap-2 sm:gap-3">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                otpRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              onPaste={handleOtpPaste}
              className={`w-10 h-12 sm:w-12 sm:h-12 text-center text-lg font-semibold border-2 rounded-lg ${
                otpError
                  ? 'border-red-500'
                  : 'border-gray-200 focus:border-[#3F3FF3]'
              }`}
            />
          ))}
        </div>

        {otpError && (
          <p className="text-red-500 text-sm text-center">
            Invalid verification code. Please try again.
          </p>
        )}

        <Button
          onClick={handleVerifyOtp}
          disabled={!canProceed}
          className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: '#3F3FF3' }}
        >
          Verify Code
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Didn{`'`}t receive the code?{' '}
          <button
            className="font-medium cursor-pointer underline-offset-4 hover:underline"
            style={{ color: '#3F3FF3' }}
          >
            Resend Code
          </button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link
            href="/"
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
