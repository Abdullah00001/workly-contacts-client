'use client';

import axiosClient from '@/lib/axios';
import { AxiosError } from 'axios';

export async function RetrieveLabels() {
  try {
    const response = await axiosClient.get('/label');
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Unknown error occurred in Get Labels Service');
  }
}

export async function CreateLabel(payload: { labelName: string }) {
  try {
    const response = await axiosClient.post('/label', payload);
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Unknown error occurred in Create Label Service');
  }
}

export async function UpdateLabel({
  _id,
  labelName,
}: {
  labelName: string;
  _id: string;
}) {
  try {
    const response = await axiosClient.patch(`/label/${_id}`, { labelName });
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Unknown error occurred in Create Label Service');
  }
}

export async function DeleteLabel({
  _id,
  withContacts = false,
}: {
  _id: string;
  withContacts?: boolean;
}) {
  try {
    const response = await axiosClient.delete(
      `/label/${_id}?withContacts=${withContacts}`
    );
    return response.data?.data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    throw new Error('Unknown error occurred in Create Label Service');
  }
}
