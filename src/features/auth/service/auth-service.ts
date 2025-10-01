'use client';

import {
  AuthMessages,
  TAccountVerifyPayload,
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
    await axiosClient.get('/auth/check');
    return AuthMessages.AUTHENTICATED;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error?.response?.status;
      switch (status) {
        case 401:
          try {
            await axiosClient.post('/auth/refresh');
            return AuthMessages.AUTHENTICATED;
          } catch (error) {
            if (error instanceof AxiosError) {
              const status = error?.response?.status;
              switch (status) {
                case 401:
                  return AuthMessages.UNAUTHENTICATED;
                case 500:
                  return AuthMessages.SERVER_ERROR;
                default:
                  return AuthMessages.SERVER_ERROR;
              }
            }
          }
        case 500:
          return AuthMessages.SERVER_ERROR;
        default:
          return AuthMessages.SERVER_ERROR;
      }
    }
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
