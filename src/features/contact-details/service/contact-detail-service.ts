'use client';
import axiosClient from '@/lib/axios';
import { TToggleFavoriteStatus } from '../types/type';

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

export async function ToggleFavoriteStatus({
  id,
  payload,
}: TToggleFavoriteStatus) {
  try {
    const response = await axiosClient.patch(`/favorites/${id}`, payload);
    return response.data?.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Unknown error occurred in favorite toggle service');
  }
}

export async function SingleTrash(contactId: string) {
  try {
    const response = await axiosClient.patch(`/trash/${contactId}`);
    return response.data?.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Unknown error occurred in favorite toggle service');
  }
}

export async function BulkTrash(payload: { contactIds: string[] }) {
  try {
    const response = await axiosClient.patch(`/trash`, payload);
    return response.data?.data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Unknown error occurred in favorite toggle service');
  }
}
