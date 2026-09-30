interface IUser {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  photo?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
}
interface UserProfilePayload {
  user: IUser;
}

interface LoginResponse {
  status: boolean;
  code: number;
  payload: LoginPayload;
}

interface LoginPayload {
  user: IUser;
  token: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}
interface ApiFieldError {
  path: string;
  message: string;
}
interface ErrorResponse {
  status: false;
  message: string;
  code?: number;
  errors?: ApiFieldError[];
}

interface SuccessResponse<T> {
  status: true;
  message?: string;
  code?: number;

  payload: T;
}
interface IPaginationResponse<T> {
  data: T[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface SuccessResponseNoPayload {
  status: true;
  code?: number;
  message?: string;
}

export type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;
