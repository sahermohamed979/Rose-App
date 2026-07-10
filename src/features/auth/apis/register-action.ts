'use server';

import {
  RegisterSchemaType,
  RegisterResponse,
  EmailVerificationSchemaType,
  OtpVerificationSchemaType,
} from '@/features/auth/types/register-types';
import {
  emailVerificationSchema,
  otpVerificationSchema,
  registerSchema,
} from '@/features/auth/schemas/register-schema';

export const registerUser = async (data: RegisterSchemaType) => {
  const t = (key: string) => key;
  // 1. Check schema
  const schema = registerSchema(t);
  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: 'Invalid input data',
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      }
    );

    const res: RegisterResponse = await response.json();

    // 2. Check API status
    if (!res.status) {
      return {
        success: false,
        message: res.message || 'Registration failed',
      };
    }

    return {
      success: true,
      message: res.message,
    };
  } catch (error) {
    // Handle network errors
    return {
      success: false,
      message: 'Server unreachable',
    };
  }
};

export const verifyEmail = async (email: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/send-email-verification`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `Request failed (${response.status})`,
    }));
    return {
      status: false,
      message: error.message,
    };
  }
  return response.json();
};

export const confirmEmailVerification = async (
  data: OtpVerificationSchemaType & EmailVerificationSchemaType
) => {
  const result = otpVerificationSchema
    .merge(emailVerificationSchema)
    .safeParse(data);
  if (!result.success) {
    return {
      status: false,
      message: 'Invalid input data',
    };
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email-verification`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: data.email, code: data.otp }),
    }
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `Request failed (${response.status})`,
    }));
    return {
      status: false,
      message: error.message,
    };
  }
  return response.json();
};
