export type TRecoverStep =
  | 'initiate'
  | 'identify'
  | 'verify_otp'
  | 'reset_password'
  | 'success';

export type TUserInfo = {
  email: string;
  name: string;
  avatar: string;
};

export type TFindUserPayload = {
  email: string;
};

export type TVerifyRecoverOtpPayload = {
  otp: string;
};

export type TResetPasswordPayload = {
  password: string;
  confirmPassword?: string;
};

export type TPasswordStrength = {
  score: number;
  strength: 'weak' | 'medium' | 'strong';
  checks: {
    length: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
  };
};

// Step component props
export type TEmailStepProps = {
  onNavigate: (step: TRecoverStep) => void;
};

export type TUserConfirmationStepProps = {
  onNavigate: (step: TRecoverStep) => void;
};

export type TOtpStepProps = {
  onNavigate: (step: TRecoverStep) => void;
};

export type TPasswordResetStepProps = {
  onNavigate: (step: TRecoverStep) => void;
};

export type TSuccessStepProps = Record<string, never>;

// API Response types
export type TRecoverUserInfoResponse = {
  email: string;
  name: string;
  avatar?: string;
};

export type TInitiateRecoveryResponse = {
  success: boolean;
  message: string;
};

export type TVerifyOtpResponse = {
  success: boolean;
  message: string;
};

export type TResetPasswordResponse = {
  success: boolean;
  message: string;
};
