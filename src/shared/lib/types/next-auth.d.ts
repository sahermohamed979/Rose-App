import { IUser } from './api';

declare module 'next-auth' {
  interface User {
    user: IUser;
    token: string;
  }

  interface Session {
    user: IUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: IUser;
    token: string;
  }
}
