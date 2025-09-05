'use client';

import { useState } from 'react';
import StepIndicator from '@/features/auth/components/StepIndicator';
import EmailStep from '@/features/auth/components/EmailStep';
import UserConfirmationStep from '@/features/auth/components/UserConfirmationStep';
import OtpStep from '@/features/auth/components/OtpStep';
import PasswordResetStep from '@/features/auth/components/PasswordResetStep';
import SuccessStep from '@/features/auth/components/SuccessStep';

interface UserInfo {
  name: string;
  email: string;
  avatar: string;
}

export default function ForgotPasswordClient() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleEmailSubmit = (emailValue: string) => {
    setEmail(emailValue);
    // Mock user data
    setUserInfo({
      name: 'John Doe',
      email: emailValue,
      avatar: '/diverse-user-avatars.png',
    });
    setCurrentStep(2);
  };

  const handleUserConfirmation = (isCorrectUser: boolean) => {
    if (isCorrectUser) {
      setCurrentStep(3);
    } else {
      setCurrentStep(1);
      setUserInfo(null);
      setEmail('');
    }
  };

  const handleOtpVerification = () => {
    setCurrentStep(4);
  };

  const handlePasswordReset = () => {
    setCurrentStep(5);
  };

  return (
    <>
      <StepIndicator currentStep={currentStep} totalSteps={4} />

      {/* Step Components */}
      {currentStep === 1 && <EmailStep onSubmit={handleEmailSubmit} />}

      {currentStep === 2 && userInfo && (
        <UserConfirmationStep
          userInfo={userInfo}
          onConfirm={handleUserConfirmation}
        />
      )}

      {currentStep === 3 && (
        <OtpStep
          email={userInfo?.email || ''}
          onVerify={handleOtpVerification}
        />
      )}

      {currentStep === 4 && <PasswordResetStep onReset={handlePasswordReset} />}

      {currentStep === 5 && <SuccessStep />}
    </>
  );
}
