import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {
  ApiResponse,
  LoginCredentials,
  LoginPayload,
  LoginResponse,
} from './shared/lib/types/api';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
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
            } as LoginCredentials),
          }
        );

        if (!res.ok && res.status !== 401 && res.status !== 400) {
          throw new Error('networkError');
        }

        const data: ApiResponse<LoginPayload> = await res.json();

        if (!data.status) {
          throw new Error('invalidCredentials');
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
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.accessToken = user.token;
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
