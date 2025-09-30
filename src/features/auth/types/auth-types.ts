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
}
