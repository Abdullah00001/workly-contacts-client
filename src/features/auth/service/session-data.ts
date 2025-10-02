import { cookies } from 'next/headers';

export const RetrieveSessionsForClearService = async () => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const response = await fetch(
      `${process.env.API_BASE_URL}/auth/clear-device/sessions`,
      {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          Cookie: cookieHeader,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) return await response.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Unknown error occurred.');
  }
};
