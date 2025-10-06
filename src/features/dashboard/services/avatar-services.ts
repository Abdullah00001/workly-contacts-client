import axiosClient from '@/lib/axios';
import { AxiosError } from 'axios';

export const GetAvatarInformation = async () => {
  try {
    const response = await axiosClient.get('/me?fields=name,avatar,email');
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Something went wrong!');
  }
};
