'use client';
import { AuthErrorType } from '@/features/auth/types/auth-types';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (error.response?.status === 440) {
      window.location.href = '/';
    }
    if (
      error.response?.status === 401 &&
      (error.response?.data as { error: AuthErrorType })?.error ===
        AuthErrorType.SESSION_BLACKLISTED
    ) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/force-logout`,
        { Credential: true }
      );
      window.location.href = '/';
      return;
    }
    if (
      error.response?.status === 401 &&
      ((error.response?.data as { error: AuthErrorType })?.error ===
        AuthErrorType.TOKEN_INVALID ||
        (error.response?.status === 401 &&
          (error.response?.data as { error: AuthErrorType })?.error ===
            AuthErrorType.TOKEN_BLACKLISTED))
    ) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/force-logout`,
        { Credential: true }
      );
      window.location.href = '/';
      return;
    }
    if (
      error.response?.status === 401 &&
      (error.response?.data as { error: AuthErrorType })?.error ===
        AuthErrorType.TOKEN_EXPIRED &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;
      try {
        await axiosClient.post('/auth/refresh');
        return axiosClient(originalRequest);
      } catch (refreshError) {
        await axiosClient.post('/auth/logout');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
