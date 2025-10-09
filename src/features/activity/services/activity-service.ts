import { cookies } from 'next/headers';

export const RetrieveActivity = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/activity`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      cache: 'no-cache',
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const RetrieveActivityDetails = async (userId: string) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/activity/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieHeader,
        },
        cache: 'no-cache',
      }
    );
    if (response.status === 404) {
      const data = await response.json();
      return data;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
