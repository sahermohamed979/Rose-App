export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  photo?: File | null;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  photo?: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}
