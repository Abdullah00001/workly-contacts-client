'use client';
import axiosClient from '@/lib/axios';
import { AxiosError } from 'axios';

export const RetrieveActivity = async () => {
  try {
    const response = await axiosClient.get('/activity');
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error('Unknown Error Occurred,Please Refresh The Page!');
  }
};

export const RetrieveActivityDetails = async (userId: string) => {
  try {
    const response = await axiosClient(`/activity/${userId}`);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error('Unknown Error Occurred,Please Refresh The Page!');
  }
};
