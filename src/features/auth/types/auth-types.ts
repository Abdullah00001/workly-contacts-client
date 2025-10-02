import { SignupSchema } from '@/lib/validation/auth-validation';
import { z } from 'zod';

export type TSignupPayload = z.infer<typeof SignupSchema>;
export type TSignupPayloadError = {
  name?: string;
  email?: string;
  password?: string;
};

export type TAccountVerifyPayload = {
  otp: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
  captchaToken: string;
  rememberMe: boolean;
};

export enum AuthMessages {
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  SERVER_ERROR = 'server_error',
  SESSION_EXPIRED='session_expired'
}

export type TDeviceIconProps = {
  deviceType: 'mobile' | 'tablet' | 'desktop';
  className?: string;
};

export type TSessionActionsProps = {
  /** Callback function when "Remove All Other Sessions" is clicked */
  onRemoveAll: () => void;
  /** Callback function when "Continue" is clicked */
  onContinue: () => void;
};

export type TSession = {
  sessionId: string;
  createdAt: string;
  expiredAt: string;
  lastUsedAt: string;
  userId: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
  location: string;
};

export type TSessionListProps = {
  /** Array of sessions to display */
  sessions: TSession[];
  /** Callback function when a session is removed */
  onRemoveSession: (sid: string) => void;
};

export type TSessionCardProps = {
  /** Session data to display */
  session: TSession;
  /** Callback function when remove button is clicked */
  onRemove: (sid: string) => void;
};

export type TSessionContainerProps = {
  sessionList: TSession[];
};

export type TClearSessionServicePayload={
  devices:string[]
}