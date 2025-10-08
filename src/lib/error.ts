import { AuthErrorType } from '@/features/auth/types/auth-types';

export default class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const getErrorCode = (data: unknown): AuthErrorType | undefined => {
  if (data && typeof data === 'object' && 'error' in data) {
    return (data as { error: AuthErrorType }).error;
  }
  return undefined;
};
