import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginResponse } from './shared/lib/types/api';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'login',
      credentials: {
        username: {},
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
          remember: credentials?.rememberMe === 'true',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user && 'remember' in user) {
        token.user = user.user;
        token.token = user.token;

        token.expireAt =
          Date.now() +
          (user.remember
            ? 30 * 24 * 60 * 60 * 1000
            : 2 * 60 * 60 * 1000);
      }

      if (token.expireAt && Date.now() > token.expireAt) {
        return {};
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token.user) {
        session.user = token.user;
      }

      return session;
    },
  },
};
