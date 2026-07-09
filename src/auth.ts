import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginResponse } from './shared/lib/types/api';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'login',
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials?.username,
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
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};
