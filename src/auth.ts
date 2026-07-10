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
    maxAge: 30 * 24 * 60 * 60, // Must be 30 days, otherwise browser deletes cookie after 1 day
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // Must match session maxAge
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
        // rememberMe is on the top-level 'user' object returned from authorize
        token.rememberMe = user.rememberMe;
      }

      // Dynamic expiration based on rememberMe
      if (token.rememberMe) {
        token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days
      } else {
        token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 1 day
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};
