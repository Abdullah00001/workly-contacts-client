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
import {
  RecoverStepOneGuard,
  RecoverStepThreeGuard,
  RecoverStepTwoGuard,
} from './RecoverStepsGuard';

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
  const [currentStep, setCurrentStep] = useState<TRecoverStep | null>(null);

  useEffect(() => {
    const stepParam = searchParams.get('step') as TRecoverStep | null;

    if (!stepParam) {
      setCurrentStep('initiate');
    } else if (!STEP_MAP[stepParam]) {
      router.replace('/auth/recover?step=initiate');
      setCurrentStep('initiate');
    } else {
      setCurrentStep(stepParam);
    }
  }, [searchParams, router]);

  const handleNavigate = (step: TRecoverStep) => {
    router.push(`/auth/recover?step=${step}`);
  };
  if (!currentStep) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <StepIndicator currentStep={1} totalSteps={4} />
        <div className="w-[320px] h-[160px] bg-gray-100 rounded-md animate-pulse mt-4" />
      </div>
    );
  }
  const stepNumber = STEP_MAP[currentStep];

  return (
    <>
      {stepNumber < 5 && (
        <StepIndicator currentStep={stepNumber} totalSteps={4} />
      )}

      {currentStep === 'initiate' && <EmailStep onNavigate={handleNavigate} />}
      {currentStep === 'identify' && (
        <RecoverStepOneGuard>
          <UserConfirmationStep onNavigate={handleNavigate} />
        </RecoverStepOneGuard>
      )}
      {currentStep === 'verify_otp' && (
        <RecoverStepTwoGuard>
          <OtpStep onNavigate={handleNavigate} />
        </RecoverStepTwoGuard>
      )}
      {currentStep === 'reset_password' && (
        <RecoverStepThreeGuard>
          <PasswordResetStep onNavigate={handleNavigate} />
        </RecoverStepThreeGuard>
      )}
      {currentStep === 'success' && <SuccessStep />}
    </>
  );
}
