import axiosClient from '@/lib/axios';
import { AxiosError } from 'axios';

export async function RetrieveTrash() {
  try {
    const response = await axiosClient.get('/trash');
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Something went wrong on retrieve trash service');
  }
}

export async function EmptyTrashContacts() {
  try {
    const response = await axiosClient.delete('/contacts/empty');
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Something went wrong on empty trash service');
  }
}
