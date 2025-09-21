'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle } from 'lucide-react';

interface VerifyOtpProps {
  email: string;
}

export default function VerifyOtp({ email }: VerifyOtpProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const canProceed = otp.every((digit) => digit !== '') && !isVerifying;

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

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

  const handleVerifyOtp = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return;

    setIsVerifying(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate OTP verification (for demo, accept any 6-digit code)
    if (otpValue.length === 6) {
      setIsSuccess(true);
      setTimeout(() => {
        handleSuccess();
      }, 2000);
    } else {
      setOtpError(true);
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    }

    setIsVerifying(false);
  };

  const handleResendCode = () => {
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setOtpError(false);
    otpRefs.current[0]?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSuccess = () => {
    // Redirect to dashboard or login
    window.location.href = '/dashboard';
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div className="absolute inset-0 w-20 h-20 rounded-full bg-green-200 animate-ping opacity-75"></div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-foreground font-semibold">
            Account Verified!
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Your account has been successfully verified. Welcome to Workly
            Contacts!
          </p>
        </div>

        <div className="animate-fade-in-up">
          <Button
            className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer"
            style={{ backgroundColor: '#3F3FF3' }}
            onClick={handleSuccess}
          >
            Continue to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-foreground font-semibold">
          Verify Your Account
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          We've sent a 6-digit verification code to{' '}
          <span className="font-medium text-foreground">{email}</span>
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
              className={`w-10 h-12 sm:w-12 sm:h-12 text-center text-lg font-semibold border-2 rounded-lg transition-all duration-200 ${
                otpError
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-[#3F3FF3] focus:ring-2 focus:ring-[#3F3FF3]/20'
              }`}
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        {otpError && (
          <div className="animate-shake">
            <p className="text-red-500 text-sm text-center font-medium">
              Invalid verification code. Please try again.
            </p>
          </div>
        )}

        <Button
          onClick={handleVerifyOtp}
          disabled={!canProceed}
          className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{ backgroundColor: '#3F3FF3' }}
        >
          {isVerifying ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Verifying...</span>
            </div>
          ) : (
            'Verify Code'
          )}
        </Button>

        <div className="flex items-center justify-between text-sm">
          <div className="text-muted-foreground">Didn't receive the code?</div>
          <div className="flex items-center space-x-3">
            {!canResend && (
              <span className="text-xs text-muted-foreground font-mono">
                {formatTime(timer)}
              </span>
            )}
            <button
              onClick={handleResendCode}
              disabled={!canResend}
              className={`font-medium cursor-pointer underline-offset-4 hover:underline transition-colors duration-200 ${
                canResend ? 'hover:opacity-80' : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ color: canResend ? '#3F3FF3' : '#9CA3AF' }}
              aria-label="Resend verification code"
            >
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
