import { AxiosError } from 'axios';
import { TUpdateContactDetails } from '../types/type';
import axiosClient from '@/lib/axios';

export async function UpdateContactInfoForm({
  id,
  payload,
}: {
  id: string;
  payload: FormData;
}) {
  try {
    const response = await axiosClient.put(`/contacts/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Update Failed, Try again!');
  }
}

export async function UpdateContactInfoText({
  id,
  payload,
}: {
  id: string;
  payload: TUpdateContactDetails;
}) {
  try {
    const response = await axiosClient.patch(`/contacts/${id}`, payload);
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Update Failed, Try again!');
  }
}
