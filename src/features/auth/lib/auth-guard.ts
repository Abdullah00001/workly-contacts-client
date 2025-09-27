import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Its An Page Guard For Verify User Registered Email With Otp Page
 * @returns
 */
export const checkVerifyPageAccess = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const res = await fetch(`${process.env.API_BASE_URL}/auth/verify/check`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  if (res.status !== 200) redirect('/auth/signup');
  return;
};
