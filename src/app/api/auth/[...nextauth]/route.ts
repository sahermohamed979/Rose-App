import { authOptions } from '@/auth';
import NextAuth from 'next-auth';
import { getToken, decode, JWT } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

const nextAuthHandler = NextAuth(authOptions);

const handler = async (request: NextRequest, context: any) => {
  // 1. Generate the default response from NextAuth
  const response = await nextAuthHandler(request, context);

  // 2. Attempt to read the token from the incoming request (e.g., during page navigation)
  let token: JWT | null = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 3. Extract the token from the generated response (e.g., during the initial login)
  if (!token) {
    const setCookies = response.headers.getSetCookie();
    const sessionCookie = setCookies.find(
      (cookie: string) =>
        cookie.startsWith('next-auth.session-token=') ||
        cookie.startsWith('__Secure-next-auth.session-token=')
    );

    if (sessionCookie) {
      const tokenValue = sessionCookie.split('=')[1].split(';')[0];

      token = await decode({
        token: tokenValue,
        secret: process.env.NEXTAUTH_SECRET as string,
      });
    }
  }

  // 4. Modify the cookie if the user chose not to remember the session (Remember me: false)
  if (token && token.remember === false) {
    const setCookies = response.headers.getSetCookie();

    // Clear the existing cookies from the header
    response.headers.delete('set-cookie');

    for (const cookieString of setCookies) {
      if (cookieString.includes('next-auth.session-token')) {
        // Remove expiration dates to force it as a Session Cookie
        const modifiedCookie = cookieString
          .replace(/Expires=[^;]+;?\s*/gi, '')
          .replace(/Max-Age=[^;]+;?\s*/gi, '');

        response.headers.append('set-cookie', modifiedCookie);
      } else {
        response.headers.append('set-cookie', cookieString);
      }
    }
  }

  return response;
};

export { handler as GET, handler as POST };
