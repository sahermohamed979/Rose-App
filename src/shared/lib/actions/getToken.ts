'use server';
import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

export const getAuthToken = async () => {
  const cookieStore = await cookies();
  const token =
    cookieStore.get('__Secure-next-auth.session-token')?.value ??
    cookieStore.get('next-auth.session-token')?.value;

  try {
    const jwt = await decode({
      token: token,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    return jwt;
  } catch {
    return null;
  }

  return null;
};
