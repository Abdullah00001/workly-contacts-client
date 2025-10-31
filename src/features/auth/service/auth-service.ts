'use client';

import {
  AuthErrorType,
  AuthMessages,
  TAccountVerifyPayload,
  TClearSessionServicePayload,
  TLoginPayload,
  TSignupPayload,
} from '@/features/auth/types/auth-types';
import axiosClient from '@/lib/axios';
import HttpError from '@/lib/error';
import { AxiosError } from 'axios';

export const SignupService = async (payload: TSignupPayload) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
      {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify(payload),
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
        throw new Error('IP has been temporary blocked,Try again later.');
      case 409:
        throw new Error('Email Already Registered,Try different one.');
      default:
        throw new Error('Unexpected server error. Please try again later.');
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

export const AccountVerify = async (payload: TAccountVerifyPayload) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify`,
      {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify(payload),
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
        throw new Error(
          'The OTP you entered is invalid. Please double-check and try again.'
        );
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

export const ResendOtp = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/resend`,
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

export const CheckResendOtpAvailability = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/resend/status`,
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

export const checkAccessAndRefresh = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/check`,
      {
        cache: 'no-cache',
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) return AuthMessages.AUTHENTICATED;
    const status = response.status;
    const data = await response.json();
    if (status === 401) {
      if (
        data?.error === AuthErrorType.TOKEN_INVALID ||
        data?.error === AuthErrorType.TOKEN_BLACKLISTED
      ) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/force-logout`,
          {
            cache: 'no-cache',
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        return AuthMessages.UNAUTHENTICATED;
      }
      if (data?.error === AuthErrorType.SESSION_BLACKLISTED) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/force-logout`,
          {
            cache: 'no-cache',
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        return AuthMessages.SESSION_EXPIRED;
      }
      if (data?.error === AuthErrorType.TOKEN_EXPIRED) {
        const refreshResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          {
            cache: 'no-cache',
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (refreshResponse.ok) return AuthMessages.AUTHENTICATED;
        const refreshStatus = refreshResponse.status;
        const refreshResponseData = await refreshResponse.json();
        if (refreshStatus === 401) {
          if (
            refreshResponseData?.error === AuthErrorType.TOKEN_INVALID ||
            refreshResponseData?.error === AuthErrorType.TOKEN_BLACKLISTED
          ) {
            await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/force-logout`,
              {
                cache: 'no-cache',
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            return AuthMessages.UNAUTHENTICATED;
          }
          if (
            refreshResponseData?.error === AuthErrorType.SESSION_BLACKLISTED
          ) {
            await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/force-logout`,
              {
                cache: 'no-cache',
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            return AuthMessages.SESSION_EXPIRED;
          }
        }
      }
    }
    return AuthMessages.UNAUTHENTICATED;
  } catch (error) {
    return AuthMessages.SERVER_ERROR;
  }
};

export const LoginService = async (payload: TLoginPayload) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) return await response.json();
    const status = response.status;
    switch (status) {
      case 401:
        throw new HttpError(
          401,
          'Invalid Credential, Check Your Email And Password.'
        );
      case 402:
        throw new HttpError(402, 'Captcha Required.');
      case 403:
        throw new HttpError(
          403,
          'Your IP address has been temporarily blocked due to suspicious activity.'
        );
      case 423:
        throw new HttpError(423, 'Account Not Verified.');
      case 429:
        throw new HttpError(429, 'Login limit exceed');
    }
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new Error(
        error.message || 'Network error. Please check your connection.'
      );
    }
    throw new Error('Unknown error occurred.');
  }
};

export const LogoutService = async () => {
  try {
    await axiosClient.post('/auth/logout');
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error('Check your internet connection or try again later.');
  }
};

export const DeleteAccountService = async () => {
  try {
    await axiosClient.delete('/me');
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error('Check your internet connection or try again later.');
  }
};

export const ClearSessionService = async (
  payload: TClearSessionServicePayload
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/clear-device`,
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Check your internet connection or try again later.');
  }
};
