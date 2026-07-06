import { z } from 'zod';
import { emailSchema } from '../schemas/forget-password-schema';
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
  code: number;
  message: string;
  errors: ValidationError[];
}
export type ForgetResponse =
  | ForgetResponseSuccess
  | ForgetResponseError;
export type emailInput = z.infer<typeof emailSchema>;

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
