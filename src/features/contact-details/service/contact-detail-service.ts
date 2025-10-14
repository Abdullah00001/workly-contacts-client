'use client';
import axiosClient from '@/lib/axios';

export async function RetrieveContactDetails(payload: string) {
  try {
    const response = await axiosClient.get(`/contacts/${payload}`);
    return response.data?.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error(
      'Unknown error occurred in retrieve contact details service'
    );
  }
}
