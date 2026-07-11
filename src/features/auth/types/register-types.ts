import { z } from 'zod';
import {
  // emailVerificationSchema,
  otpVerificationSchema,
  registerSchema,
} from '../schemas/register-schema';

//   API response structure for successful registration

interface RegisterResponseSuccess {
  status: true;
  code: number;
  message: string;
  data?: RegisterSchemaType;
}

// Validation error details for specific form fields

interface ValidationError {
  path: string;
  message: string;
}

// API response structure for registration failures

interface RegisterResponseError {
  status: false;
  code: number;
  message: string;
  errors?: ValidationError[];
}

// Unified registration response type
export type RegisterResponse =
  RegisterResponseSuccess | RegisterResponseError;

// TypeScript type derived from Zod schema for form data
export type RegisterSchemaType = z.infer<
  ReturnType<typeof registerSchema>
>;
// export type EmailVerificationSchemaType = z.infer<
//   ReturnType<typeof emailVerificationSchema>
// >;
export type OtpVerificationSchemaType = z.infer<
  ReturnType<typeof otpVerificationSchema>
>;

export type ApiValidationError = { path: string; message: string };

/** Raw API response from confirm-email-verification */
export type OtpConfirmApiResponse =
  | { status: true; code: number; message: string }
  | {
      status: false;
      code: number;
      message: string;
      errors?: ApiValidationError[];
    };
