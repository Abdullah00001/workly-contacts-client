'use client';
import {
  TFindUserPayload,
  TResetPasswordPayload,
  TVerifyRecoverOtpPayload,
} from '@/features/auth/types/recover-type';
import { AuthMessages } from '../types/auth-types';

export const FindUserService = async (payload: TFindUserPayload) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/find`,
      {
        credentials: 'include',
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) return await response.json();
    const responseStatus = response.status;
    switch (responseStatus) {
      case 403:
        throw new Error('User Not Verified');
      case 404:
        throw new Error('User Not Found');
      default:
        throw new Error('Internal Server Error');
    }
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Unknown Error Occurred');
  }
};

export const CheckStepOneGuardService = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/check/stp1`,
      {
        credentials: 'include',
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) return await response.json();
    const refreshResponseStatus = response.status;
    switch (refreshResponseStatus) {
      case 401:
        return AuthMessages.UNAUTHENTICATED;
      case 403:
        return AuthMessages.SESSION_EXPIRED;
      case 500:
        return AuthMessages.SERVER_ERROR;
      default:
        return AuthMessages.SERVER_ERROR;
    }
  } catch (error) {
    return AuthMessages.SERVER_ERROR;
  }
};

export const CheckStepTwoGuardService = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/check/stp2`,
      {
        credentials: 'include',
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) return await response.json();
    const refreshResponseStatus = response.status;
    switch (refreshResponseStatus) {
      case 401:
        return AuthMessages.UNAUTHENTICATED;
      case 403:
        return AuthMessages.SESSION_EXPIRED;
      case 500:
        return AuthMessages.SERVER_ERROR;
      default:
        return AuthMessages.SERVER_ERROR;
    }
  } catch (error) {
    return AuthMessages.SERVER_ERROR;
  }
};

export const CheckStepThreeGuardService = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/check/stp3`,
      {
        credentials: 'include',
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) return await response.json();
    const refreshResponseStatus = response.status;
    switch (refreshResponseStatus) {
      case 401:
        return AuthMessages.UNAUTHENTICATED;
      case 403:
        return AuthMessages.SESSION_EXPIRED;
      case 500:
        return AuthMessages.SERVER_ERROR;
      default:
        return AuthMessages.SERVER_ERROR;
    }
  } catch (error) {
    return AuthMessages.SERVER_ERROR;
  }
};

export const RecoverUserItsNotMeService = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/not_me`,
      {
        credentials: 'include',
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) return await response.json();
    const refreshResponseStatus = response.status;
    switch (refreshResponseStatus) {
      case 401:
        return AuthMessages.UNAUTHENTICATED;
      case 403:
        return AuthMessages.SESSION_EXPIRED;
      case 500:
        return AuthMessages.SERVER_ERROR;
      default:
        return AuthMessages.SERVER_ERROR;
    }
  } catch (error) {
    return AuthMessages.SERVER_ERROR;
  }
};

export const RecoverUserInfoService = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/user`,
      {
        credentials: 'include',
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) return await response.json();
    const responseStatus = response.status;
    switch (responseStatus) {
      case 401:
        throw new Error('Session Expired.');
      case 500:
        throw new Error('Internal Server Error');
      default:
        throw new Error(
          'Otp Verification Failed,Check Your Internet Connection!'
        );
    }
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Otp Sent Failed,Check Your Internet Connection!');
  }
};

export const SentRecoverOtp = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/sent-otp`,
      {
        credentials: 'include',
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) return await response.json();
    const responseStatus = response.status;
    switch (responseStatus) {
      case 401:
        throw new Error('Session Expired.');
      case 500:
        throw new Error('Internal Server Error');
      default:
        throw new Error(
          'Otp Verification Failed,Check Your Internet Connection!'
        );
    }
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Otp Sent Failed,Check Your Internet Connection!');
  }
};

export const VerifyRecoverOtpService = async (
  payload: TVerifyRecoverOtpPayload
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/verify`,
      {
        credentials: 'include',
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) return await response.json();
    const responseStatus = response.status;
    switch (responseStatus) {
      case 401:
        throw new Error('Session Expired.');
      case 400:
        throw new Error('Otp Expired Or Invalid.');
      case 500:
        throw new Error('Internal Server Error');
      default:
        throw new Error(
          'Otp Verification Failed,Check Your Internet Connection!'
        );
    }
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Otp Verification Failed,Check Your Internet Connection!');
  }
};

export const ResendRecoverOtp = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/resend`,
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );
    if (response.ok) return await response.json();
    const status = response.status;
    switch (status) {
      case 400:
        throw new Error('You Recently Request One,Try Again Later');
      case 401:
        throw new Error('Session Has Been Expired,Please Signup Again.');
      case 429:
        throw new Error('Too Many Request,Try Again Later.');
      case 500:
        throw new Error(
          'Something went wrong on our end. Please try again in a few minutes.'
        );
      default:
        throw new Error(
          'An unexpected error occurred. Please try again later.'
        );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || 'Network error. Please check your connection.'
      );
    }
    throw new Error('Unknown error occurred.');
  }
};

export const CheckRecoverResendOtpAvailability = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/resend/status`,
      {
        credentials: 'include',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }
    );
    if (response.ok) return await response.json();
    const status = response.status;
    switch (status) {
      case 401:
        throw new Error('Session Has Been Expired,Please Signup Again.');
      case 500:
        throw new Error(
          'Something went wrong on our end. Please try again in a few minutes.'
        );
      default:
        throw new Error(
          'An unexpected error occurred. Please try again later.'
        );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || 'Network error. Please check your connection.'
      );
    }
    throw new Error('Unknown error occurred.');
  }
};

export const ResetPassword = async (payload: TResetPasswordPayload) => {
  console.log(payload);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/reset`,
      {
        credentials: 'include',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) return await response.json();
    const status = response.status;
    switch (status) {
      case 401:
        throw new Error('Session Has Been Expired,Please Signup Again.');
      case 500:
        throw new Error(
          'Something went wrong on our end. Please try again in a few minutes.'
        );
      default:
        throw new Error(
          'An unexpected error occurred. Please try again later.'
        );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || 'Network error. Please check your connection.'
      );
    }
    throw new Error('Unknown error occurred.');
  }
};
