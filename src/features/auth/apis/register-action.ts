'use server';

import {
  RegisterSchemaType,
  RegisterResponse,
  OtpVerificationSchemaType,
} from '@/features/auth/types/register-types';
import {
  otpVerificationSchema,
  registerSchema,
} from '@/features/auth/schemas/register-schema';

export const registerUser = async (data: RegisterSchemaType) => {
  // 1. Check schema
  const t = (key: string) => key;
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
  data: OtpVerificationSchemaType & { email: string }
) => {
  const t = (key: string) => key;
  const schema = otpVerificationSchema(t);
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      status: false,
      code: 400,
      message: 'Validation failed',
      errors: [{ path: 'code', message: 'invalid' }],
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email-verification`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        code: result.data.code,
      }),
    }
  );

  return response.json();
};
