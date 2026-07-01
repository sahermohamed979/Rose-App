interface IUser {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
}

interface LoginResponse {
  status: boolean;
  code: number;
  payload: LoginPayload;
}

interface LoginPayload {
  user: User;
  token: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}
