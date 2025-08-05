import { TImage } from './contacts.interface';

export interface IFindUser {
  email: string;
}

export interface IFoundUser {
  userId: string;
  email: string;
  isVerified: boolean;
  name: string;
  avatar: TImage;
}

export interface IVerifyRecoverOtpPayload {
  otp: string;
}

export interface IResetPasswordPayload {
  password: string;
}
