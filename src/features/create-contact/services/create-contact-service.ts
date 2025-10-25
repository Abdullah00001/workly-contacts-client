import { AxiosError } from 'axios';
import { TContact } from '../types/type';
import axiosClient from '@/lib/axios';

export async function CreateContact(payload: TContact) {
  try {
    const response = await axiosClient.post('/contacts', payload);
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Unknown Error Occurred');
  }
}

export async function UploadContactAvatar(payload: FormData) {
  try {
    const response = await axiosClient.post('/image', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Unknown Error Occurred');
  }
}

export async function RemoveContactAvatar(payload: string) {
  try {
    const response = await axiosClient.delete(`/image/${payload}`);
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Unknown Error Occurred');
  }
}
