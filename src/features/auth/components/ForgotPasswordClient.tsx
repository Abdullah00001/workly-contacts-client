'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import StepIndicator from '@/features/auth/components/StepIndicator';
import EmailStep from '@/features/auth/components/EmailStep';
import UserConfirmationStep from '@/features/auth/components/UserConfirmationStep';
import OtpStep from '@/features/auth/components/OtpStep';
import PasswordResetStep from '@/features/auth/components/PasswordResetStep';
import SuccessStep from '@/features/auth/components/SuccessStep';
import type { TRecoverStep } from '@/features/auth/types/recover-type';

const STEP_MAP: Record<TRecoverStep, number> = {
  initiate: 1,
  identify: 2,
  verify_otp: 3,
  reset_password: 4,
  success: 5,
};

export default function ForgotPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<TRecoverStep>('initiate');

  useEffect(() => {
    const stepParam = searchParams.get('step') as TRecoverStep | null;

    if (!stepParam || !STEP_MAP[stepParam]) {
      // No step param or invalid, default to initiate
      if (stepParam && !STEP_MAP[stepParam]) {
        router.replace('/auth/recover?step=initiate');
      }
      setCurrentStep('initiate');
    } else {
      setCurrentStep(stepParam);
    }
  }, [searchParams, router]);

  const handleNavigate = (step: TRecoverStep) => {
    router.push(`/auth/recover?step=${step}`);
    setCurrentStep(step);
  };

  const stepNumber = STEP_MAP[currentStep];

  return (
    <>
      {stepNumber < 5 && (
        <StepIndicator currentStep={stepNumber} totalSteps={4} />
      )}
      {currentStep === 'initiate' && <EmailStep onNavigate={handleNavigate} />}
      {currentStep === 'identify' && (
        <UserConfirmationStep onNavigate={handleNavigate} />
      )}
      {/* {currentStep === 'verify_otp' && <OtpStep onNavigate={handleNavigate} />}
      {currentStep === 'reset_password' && (
        <PasswordResetStep onNavigate={handleNavigate} />
      )}
      {currentStep === 'success' && <SuccessStep />} */}
    </>
  );
}
