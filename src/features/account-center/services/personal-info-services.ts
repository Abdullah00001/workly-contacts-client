'use client';
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

export const UploadProfileAvatar = async (payload: FormData) => {
  try {
    const response = await axiosClient.put('/me/avatar', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Unknown Error Occurred In Upload Profile Avatar Service');
  }
};

export const UpdateProfileAvatar = async (payload: FormData) => {
  try {
    const response = await axiosClient.patch('/me/avatar', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Unknown Error Occurred In Update Profile Avatar Service');
  }
};

export const DeleteProfileAvatar = async (payload: string) => {
  try {
    const response = await axiosClient.delete(`/me/avatar/${payload}`);
    return response?.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Unknown Error Occurred In Delete Profile Avatar Service');
  }
};
