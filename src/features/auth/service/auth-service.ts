'use client';

import {
  TAccountVerifyPayload,
  TSignupPayload,
} from '@/features/auth/types/auth-types';
import axiosClient from '@/lib/axios';
import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

export const SignupService = async (payload: TSignupPayload) => {
  try {
    const response = await axiosClient.post('/auth/signup', payload);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error?.response?.status;
      if (status === 400) {
        throw new Error('IP has been temporary blocked,Try again later.');
      } else if (status === 409) {
        throw new Error('Email Already Registered,Try different one.');
      } else {
        throw new Error('Maybe server running on some shit,Try again later.');
      }
    }
    throw new Error('Check your internet connection or try again later.');
  }
};

export const AccountVerify = async (payload: TAccountVerifyPayload) => {
  try {
    const response = await axiosClient.post('/auth/verify', payload);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error?.response?.status;
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
    }
    throw new Error('Check your internet connection or try again later.');
  }
};

export const ResendOtp = async () => {
  try {
    const response = await axiosClient.post('/auth/resend');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error?.response?.status;
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
    }
    throw new Error('Check your internet connection or try again later.');
  }
};

export const CheckResendOtpAvailability = async () => {
  try {
    const response = await axiosClient.get('/auth/resend/status');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error?.response?.status;
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
    }
    throw new Error('Check your internet connection or try again later.');
  }
};

export const checkAccessAndRefresh = async () => {
  try {
    await axiosClient.get('/auth/check');
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error?.response?.status;
      switch (status) {
        case 401:
          try {
            await axiosClient.post('/auth/refresh');
            return true;
          } catch (error) {
            if (error instanceof AxiosError) {
              const status = error?.response?.status;
              switch (status) {
                case 401:
                  return false;
                case 500:
                  return false;
                default:
                  return false;
              }
            }
          }
        case 500:
          return false;
        default:
          return false;
      }
    }
    return false;
  }
};
