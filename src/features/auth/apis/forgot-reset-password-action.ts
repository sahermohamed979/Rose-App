'use server';

import { HEADERS } from '@/shared/context/api.constants';
import { emailSchema } from '../schemas/forget-password-schema';
import {
  emailInput,
  ForgetResponse,
  ResetPasswordInput,
} from '../types/forget-reset-password-types';
import { resetPasswordSchema } from '../schemas/reset-password-schema';

// api call to send the email to the backend
export const forgotPassword = async (email: emailInput) => {
  // validate the email
  const result = emailSchema.safeParse(email);

  if (!result.success) {
    return {
      success: false,
      message: result.error.message,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      {
        method: 'POST',
        headers: HEADERS.jsonBody,
        body: JSON.stringify(result.data),
      }
    );

    const data: ForgetResponse = await response.json();

    if (!data.status) {
      return {
        success: false,
        message: data.message || 'Failed to send email',
        status: data.status,
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong',
    };
  }
};
// api call to reset the password
export const resetPassword = async (
  token: string,
  values: ResetPasswordInput
) => {
  // check if the token is valid
  if (!token) {
    return {
      success: false,
      message: 'Link expired or invalid',
    };
  }
  // validate the reset password form
  const result = resetPasswordSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      message: result.error.message,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: 'POST',
        headers: HEADERS.jsonBody,
        // create an object from the validated data and send it to the backend with the token
        body: JSON.stringify({
          newPassword: result.data.newPassword,
          confirmPassword: result.data.confirmPassword,
          token: token,
        }),
      }
    );

    const data: ForgetResponse = await response.json();

    if (!data.status) {
      return {
        success: false,
        message: data.message || 'Failed to reset password',
        status: data.status,
      };
    }
    return data;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong',
    };
  }
};
