import { TSignupPayload } from '@/features/auth/types/auth-types';
import axiosClient from '@/lib/axios';
import { AxiosError } from 'axios';

export const SignupService = async (payload: TSignupPayload) => {
  try {
    const response = await axiosClient.post('/auth/signup', payload);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error?.response?.status;
      if (status === 400) {
        throw new Error('IP has been temporary blocked,Try again later.');
      } else if (status === 429) {
        throw new Error('Email Already Registered,Try different one.');
      } else {
        throw new Error('Maybe server running on some shit,Try again later.');
      }
    }
    throw new Error('Check your internet connection or try again later.');
  }
};
