'use client';

import axiosClient from '@/lib/axios';
import { AxiosError } from 'axios';

export async function RetrieveContacts() {
  try {
    const response = await axiosClient.get('/contacts');
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Unknown error occurred,Please Try Again');
  }
}
