import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

// Reads the access token from the request cookies
export async function getAccessToken(
  request: NextRequest
): Promise<string | undefined> {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  return token?.accessToken as string | undefined;
}
