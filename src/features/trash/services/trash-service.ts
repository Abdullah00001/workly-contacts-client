'use client';
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

export async function RecoverOneTrashItem(payload: string) {
  try {
    const response = await axiosClient.patch(`/contacts/recover/${payload}`);
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Something went wrong on recover one trash service');
  }
}

export async function RecoverManyTrashItem(payload: string[]) {
  try {
    const response = await axiosClient.patch(`/contacts/recover`, {
      contactIds: payload,
    });
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Something went wrong on recover many trash service');
  }
}

export async function EmptyManyTrashItems(payload: string[]) {
  try {
    const response = await axiosClient.delete(`/contacts/delete`, {
      data: { contactIds: payload },
    });
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Something went wrong on empty many trash service');
  }
}
