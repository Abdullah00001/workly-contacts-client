'use client'
import axiosClient from '@/lib/axios';
import { AxiosError } from 'axios';

export const GetFullProfileService = async () => {
  try {
    const response = await axiosClient.get('/me');
    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Unknown Error Occurred In Get Full Profile Service');
  }
};

export const UploadProfileAvatar = async () => {
  try {
    const response = await axiosClient.get('/me');
    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Unknown Error Occurred In Get Full Profile Service');
  }
};
