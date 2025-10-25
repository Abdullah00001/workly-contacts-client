import axiosClient from '@/lib/axios';
import { AxiosError } from 'axios';
import { TFeedbackPayload } from '../types/type';

export const GetAvatarInformation = async () => {
  try {
    const response = await axiosClient.get('/me?fields=name,avatar,email');
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Something went wrong!');
  }
};

export const SendFeedback = async (payload: TFeedbackPayload) => {
  try {
    const response = await axiosClient.post(`/feedback`, payload);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Something went wrong!');
  }
};
