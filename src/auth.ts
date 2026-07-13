import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'login',
      credentials: {
        email: {},
        password: {},
        rememberMe: {},
      },
      authorize: async (credentials) => {
        const res = await fetch(
          `${process.env.NEXT_API_URL}/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials?.email, // API accepts username for now
              password: credentials?.password,
            }),
          }
        );
        const data: LoginResponse = await res.json();
        if (!data.status) {
          return null;
        }

        return {
          id: data.payload.user.id,
          user: data.payload.user,
          token: data.payload.token,
          rememberMe: credentials?.rememberMe === 'true',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    // 30 days is the maximum allowed age; actual cookie lifetime is
    // controlled per-login by the /api/auth/remember endpoint.
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  // By omitting a maxAge on the cookie, it becomes a session cookie
  // (deleted when the browser closes) by default.
  // The /api/auth/remember endpoint upgrades it to a persistent cookie
  // when the user checks "Remember me".
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax' as const,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        // No maxAge → session cookie (cleared on browser close)
      },
    },
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
        token.rememberMe = user.rememberMe;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};
