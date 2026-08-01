import { z } from 'zod';
import { forgotPasswordEmailSchema } from '../schemas/forget-password-schema';
import { resetPasswordSchema } from '../schemas/reset-password-schema';

interface ForgetResponseSuccess {
  status: true;
  code: number;
  message: string;
}

interface ValidationError {
  path: string;
  message: string;
}

interface ForgetResponseError {
  status: false;
  message: string;
  code?: number;
  errors?: ValidationError[];
}
export type ForgetResponse =
  | ForgetResponseSuccess
  | ForgetResponseError;
export type EmailInput = z.infer<
  ReturnType<typeof forgotPasswordEmailSchema>
>;
export type ResetPasswordInput = z.infer<
  ReturnType<typeof resetPasswordSchema>
>;
