import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {
  ApiResponse,
  LoginCredentials,
  LoginPayload,
} from './shared/lib/types/api';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
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
            } as LoginCredentials),
          }
        );

        const data: ApiResponse<LoginPayload> = await res.json();

        // Inavlid credentials
        if (data.code === 400 || data.code === 401) {
          throw new Error('invalidCredentials');
        }

        // Server error
        if (!data.status) {
          throw new Error('networkError');
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
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.accessToken = user.token;
        token.remember = user.remember;
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
