'use client';
import axiosClient from '@/lib/axios';
import { AxiosError } from 'axios';

export const RetrieveActivity = async () => {
  try {
    const response = await axiosClient.get('/activity');
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw new Error('Unknown Error Occurred,Please Refresh The Page!');
  }
};

// export const RetrieveActivityDetails = async (userId: string) => {
//   const cookieStore = await cookies();
//   const cookieHeader = cookieStore.toString();
//   try {
//     const response = await fetch(
//       `${process.env.API_BASE_URL}/activity/${userId}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Cookie: cookieHeader,
//         },
//         cache: 'no-cache',
//       }
//     );
//     if (response.status === 404) {
//       const data = await response.json();
//       return data;
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
