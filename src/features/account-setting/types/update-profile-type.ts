export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  photo?: string;
  phone?: string;
}

export interface UpdateProfileResponse {
  user: {
    id: string;
    username: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    gender: 'MALE' | 'FEMALE';
    photo: string | null;
    emailVerified: boolean;
    phoneVerified: boolean;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}
