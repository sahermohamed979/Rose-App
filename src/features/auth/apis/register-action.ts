'use server';

import {
  RegisterSchemaType,
  RegisterResponse,
  EmailVerificationSchemaType,
  OtpVerificationSchemaType,
} from '@/features/auth/types/register-types';
import {
  otpVerificationSchema,
  registerSchema,
} from '@/features/auth/schemas/register-schema';
// user registeration
export const registerUser = async (
  registrationDetails: RegisterSchemaType
) => {
  const t = (key: string) => key;
  //  Check schema
  const schema = registerSchema(t);
  // validate data wih zod
  const result = schema.safeParse(registrationDetails);

  if (!result.success) {
    return {
      success: false,
      message: 'Invalid input data',
    };
  }

  try {
    // send request to api
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      }
    );

    const res: RegisterResponse = await response.json();

    //  Check API status
    if (!response.ok || !res.status) {
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
    console.error('Registration Error:', error);
    return { success: false, message: 'Server unreachable' };
  }
};
// request otp verfication email
export const verifyEmail = async (email: string) => {
  // Trigger verification email send
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
    // Handle error response from server
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
// validate otp code
export const confirmEmailVerification = async (
  verificationDetails: OtpVerificationSchemaType &
    EmailVerificationSchemaType
) => {
  const t = (key: string) => key;
  const schema = otpVerificationSchema(t);
  // Validate inputs before calling API
  const result = schema.safeParse(verificationDetails);
  if (!result.success) {
    return {
      status: false,
      code: 400,
      message: 'Validation failed',
      errors: [{ path: 'code', message: 'invalid' }],
    };
  }
  // Submit OTP and email for verification
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email-verification`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: verificationDetails.email,
        code: verificationDetails.otp,
      }),
    }
  );
  // Handle verification failure
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
