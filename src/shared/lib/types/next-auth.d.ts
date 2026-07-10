import NextAuth, { DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultUser {
    user: IUser;
    token: string;
    rememberMe?: boolean;
  }

  interface Session {
    user: IUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: IUser;
    token: string;
    rememberMe?: boolean;
  }
}
