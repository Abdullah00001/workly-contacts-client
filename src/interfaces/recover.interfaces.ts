export interface IFindUser {
  email: string;
}

export interface IFoundUser {
  userId: string;
  email: string;
  isVerified: boolean;
  name: string;
  avatar: string | null;
}

export interface IVerifyRecoverOtpPayload {
  otp: string;
}
