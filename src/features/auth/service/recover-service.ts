'use client';
import { TFindUserPayload } from '@/features/auth/types/recover-type';
import { AuthMessages } from '../types/auth-types';

export const FindUserService = async (payload: TFindUserPayload) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/find`,
      {
        credentials: 'include',
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) return await response.json();
    const responseStatus = response.status;
    switch (responseStatus) {
      case 403:
        throw new Error('User Not Verified');
      case 404:
        throw new Error('User Not Found');
      default:
        throw new Error('Internal Server Error');
    }
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Unknown Error Occurred');
  }
};

export const CheckStepOneGuardService = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/check/stp1`,
      {
        credentials: 'include',
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) return await response.json();
    const refreshResponseStatus = response.status;
    switch (refreshResponseStatus) {
      case 401:
        return AuthMessages.UNAUTHENTICATED;
      case 403:
        return AuthMessages.SESSION_EXPIRED;
      case 500:
        return AuthMessages.SERVER_ERROR;
      default:
        return AuthMessages.SERVER_ERROR;
    }
  } catch (error) {
    return AuthMessages.SERVER_ERROR;
  }
};

export const CheckStepTwoGuardService = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/check/stp2`,
      {
        credentials: 'include',
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) return await response.json();
    const refreshResponseStatus = response.status;
    switch (refreshResponseStatus) {
      case 401:
        return AuthMessages.UNAUTHENTICATED;
      case 403:
        return AuthMessages.SESSION_EXPIRED;
      case 500:
        return AuthMessages.SERVER_ERROR;
      default:
        return AuthMessages.SERVER_ERROR;
    }
  } catch (error) {
    return AuthMessages.SERVER_ERROR;
  }
};

export const CheckStepThreeGuardService = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/check/stp3`,
      {
        credentials: 'include',
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) return await response.json();
    const refreshResponseStatus = response.status;
    switch (refreshResponseStatus) {
      case 401:
        return AuthMessages.UNAUTHENTICATED;
      case 403:
        return AuthMessages.SESSION_EXPIRED;
      case 500:
        return AuthMessages.SERVER_ERROR;
      default:
        return AuthMessages.SERVER_ERROR;
    }
  } catch (error) {
    return AuthMessages.SERVER_ERROR;
  }
};

export const RecoverUserItsNotMeService = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/not_me`,
      {
        credentials: 'include',
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) return await response.json();
    const refreshResponseStatus = response.status;
    switch (refreshResponseStatus) {
      case 401:
        return AuthMessages.UNAUTHENTICATED;
      case 403:
        return AuthMessages.SESSION_EXPIRED;
      case 500:
        return AuthMessages.SERVER_ERROR;
      default:
        return AuthMessages.SERVER_ERROR;
    }
  } catch (error) {
    return AuthMessages.SERVER_ERROR;
  }
};

export const RecoverUserInfoService = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/recover/user`,
      {
        credentials: 'include',
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) return await response.json();
  } catch (error) {
    return AuthMessages.SERVER_ERROR;
  }
};
