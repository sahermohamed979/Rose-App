import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

export async function getDirectToken() {
  const cookieStore = await cookies();

  const sessionToken =
    cookieStore.get('__Secure-next-auth.session-token')?.value ??
    cookieStore.get('next-auth.session-token')?.value;

  if (!sessionToken) {
    return null;
  }

  const jwt = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return jwt?.accessToken;
}
