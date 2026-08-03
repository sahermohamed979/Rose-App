import { IUser } from './api';

declare module 'next-auth' {
  interface User {
    user: IUser;
    token: string;
    remember?: boolean;
  }

  interface Session {
    user: IUser;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: IUser;
    token: string;
    accessToken?: string;
  }
}
