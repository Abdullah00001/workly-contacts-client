'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { CheckCircle, Mail, Shield } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import {
  AccountVerify,
  CheckResendOtpAvailability,
  ResendOtp,
} from '@/features/auth/service/auth-service';
import { TAccountVerifyPayload } from '../types/auth-types';

interface VerifyOtpProps {
  email?: string;
}

export default function VerifyOtp({ email }: VerifyOtpProps = {}) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [resendError, setResendError] = useState<string>('');
  const [isResendSuccess, setIsResendSuccess] = useState<boolean>(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate: verifyAccount, isPending: isVerifying } = useMutation({
    mutationFn: async (payload: TAccountVerifyPayload) =>
      await AccountVerify(payload),
    onSuccess: () => {
      setIsSuccess(true);
      setOtpError(false);
      setErrorMessage('');
      setTimeout(() => {
        handleSuccess();
      }, 2000);
    },
    onError: (error: Error) => {
      setOtpError(true);
      setErrorMessage(error.message);
      // Clear OTP and focus first input
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    },
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: async () => await ResendOtp(),
    onSuccess: (response) => {
      const { data } = response;
      const { availableAt } = data;

      // Calculate remaining time by comparing with current time
      const currentTime = Date.now();
      const remainingMs = availableAt - currentTime;
      const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));

      setTimer(remainingSeconds);
      setCanResend(remainingSeconds === 0);

      // Show success message
      setIsResendSuccess(true);
      setResendError('');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setIsResendSuccess(false);
      }, 3000);

      // Clear current OTP and focus first input
      setOtp(['', '', '', '', '', '']);
      setOtpError(false);
      setErrorMessage('');

      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    },
    onError: (error: Error) => {
      setResendError(error.message);
      setIsResendSuccess(false);

      // Clear resend error after 5 seconds
      setTimeout(() => {
        setResendError('');
      }, 5000);
    },
  });

  const { mutate: checkResendAvailability, isPending: isCheckingAvailability } =
    useMutation({
      mutationFn: async () => await CheckResendOtpAvailability(),
      onSuccess: (response) => {
        const { data } = response;
        const { availableAt } = data;

        if (availableAt && availableAt > 0) {
          // Calculate remaining time by comparing with current time
          const currentTime = Date.now();
          const remainingMs = availableAt - currentTime;
          const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));

          setTimer(remainingSeconds);
          setCanResend(remainingSeconds === 0);
        } else {
          // If availableAt is 0 or not present, allow immediate resend
          setTimer(0);
          setCanResend(true);
        }
      },
      onError: (error: Error) => {
        console.warn('Failed to check resend availability:', error.message);
        // Default fallback - allow resend after 60 seconds
        setTimer(60);
        setCanResend(false);
      },
    });

  const canProceed = otp.every((digit) => digit !== '') && !isVerifying;

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Check resend availability on component mount
  useEffect(() => {
    checkResendAvailability();
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error state when user starts typing
    if (otpError || resendError || isResendSuccess) {
      setOtpError(false);
      setErrorMessage('');
      setResendError('');
      setIsResendSuccess(false);
    }

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

      // Clear error state when user starts editing
      if (otpError || resendError || isResendSuccess) {
        setOtpError(false);
        setErrorMessage('');
        setResendError('');
        setIsResendSuccess(false);
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (pastedData.length === 0) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || '';
    }

    setOtp(newOtp);

    // Clear error state when pasting
    if (otpError || resendError || isResendSuccess) {
      setOtpError(false);
      setErrorMessage('');
      setResendError('');
      setIsResendSuccess(false);
    }

    // Focus the next empty field or the last field
    const nextEmptyIndex = newOtp.findIndex((digit) => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    otpRefs.current[focusIndex]?.focus();
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return;

    const payload: TAccountVerifyPayload = {
      otp: otpValue,
    };

    verifyAccount(payload);
  };

  const handleResendCode = () => {
    // Clear any existing messages
    setResendError('');
    setIsResendSuccess(false);
    setOtpError(false);
    setErrorMessage('');

    // Call the resend API
    resendOtp();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSuccess = () => {
    // Redirect to dashboard
    window.location.href = '/dashboard';
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-sm mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Success Animation */}
          <div className="relative flex justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 bg-emerald-200 rounded-full animate-ping opacity-30"></div>
            <div className="absolute inset-2 w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-full animate-pulse"></div>
          </div>

          <div className="space-y-3 sm:space-y-4 px-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent leading-tight">
              Account Verified!
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Your account has been successfully verified. Welcome to{' '}
              <span className="font-semibold text-indigo-600">
                Workly Contacts!
              </span>
            </p>
          </div>

          <button
            onClick={handleSuccess}
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:max-w-md">
      <div className="text-center space-y-6 sm:space-y-8">
        {/* Header with Icon */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-center">
            <div className="p-3 sm:p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl sm:rounded-2xl">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 px-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Verify Your Account
            </h2>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <p className="text-sm sm:text-base text-center">
                We{`'`}ve sent a 6-digit code to your email
              </p>
            </div>
            {email && (
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                {email}
              </p>
            )}
          </div>
        </div>

        {/* OTP Input Section */}
        <div className="space-y-5 sm:space-y-6">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <div key={index} className="relative">
                <input
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
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(-1)}
                  disabled={isVerifying || isResending}
                  className={`w-10 h-12 sm:w-12 sm:h-14 lg:w-14 lg:h-16 text-center text-lg sm:text-xl font-bold rounded-lg sm:rounded-xl lg:rounded-2xl transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                    otpError
                      ? 'border-2 border-red-400 bg-red-50 text-red-600 animate-pulse'
                      : focusedIndex === index
                        ? 'border-2 border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-200 scale-105'
                        : digit
                          ? 'border-2 border-emerald-300 bg-emerald-50 text-emerald-700'
                          : 'border-2 border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  aria-label={`Digit ${index + 1}`}
                />
                {digit && !otpError && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                )}
              </div>
            ))}
          </div>

          {/* Success/Error Messages for Resend */}
          {(isResendSuccess || resendError) && (
            <div
              className={`rounded-lg sm:rounded-xl p-3 sm:p-4 mx-2 transition-all duration-300 ${
                isResendSuccess
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <p
                className={`text-sm font-medium flex items-start justify-center space-x-2 text-center ${
                  isResendSuccess ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                    isResendSuccess
                      ? 'bg-green-500 animate-pulse'
                      : 'bg-red-500 animate-pulse'
                  }`}
                ></span>
                <span>
                  {isResendSuccess
                    ? 'Verification code resent successfully! Check your email.'
                    : resendError}
                </span>
              </p>
            </div>
          )}

          {/* Error Message */}
          {otpError && errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mx-2 animate-shake">
              <p className="text-red-600 text-sm font-medium flex items-start justify-center space-x-2 text-center">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0 mt-1.5"></span>
                <span>{errorMessage}</span>
              </p>
            </div>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerifyOtp}
            disabled={!canProceed || isResending}
            className={`w-full py-3 sm:py-4 cursor-pointer rounded-lg sm:rounded-xl lg:rounded-2xl font-semibold text-sm sm:text-base text-white transition-all duration-200 ${
              canProceed && !isVerifying && !isResending
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isVerifying ? (
              <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              'Verify Code'
            )}
          </button>

          {/* Resend Section */}
          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mx-1">
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 text-sm">
              <span className="text-gray-600 text-center sm:text-left">
                Didn{`'`}t receive the code?
              </span>
              <div className="flex items-center justify-center space-x-3">
                {!canResend && (
                  <div className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 rounded-full">
                    <span className="text-xs font-mono text-gray-600">
                      {formatTime(timer)}
                    </span>
                  </div>
                )}
                <button
                  onClick={handleResendCode}
                  disabled={
                    !canResend ||
                    isVerifying ||
                    isResending ||
                    isCheckingAvailability
                  }
                  className={`font-semibold px-3 py-2 cursor-pointer sm:px-4 sm:py-2 rounded-lg transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                    canResend &&
                    !isVerifying &&
                    !isResending &&
                    !isCheckingAvailability
                      ? 'text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label="Resend verification code"
                >
                  {isResending ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Resend Code'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
