'use server';

import { HEADERS } from '@/shared/context/api.constants';
import { forgotPasswordEmailSchema } from '../schemas/forget-password-schema';
import {
  EmailInput,
  ForgetResponse,
  ResetPasswordInput,
} from '../types/forget-reset-password-types';
import { resetPasswordSchema } from '../schemas/reset-password-schema';
import { getTranslations } from 'next-intl/server';
// api call to send the email to the backend
export const forgotPassword = async (email: EmailInput) => {
  //
  const t = await getTranslations('forgotPw');
  // validate the email
  const result = forgotPasswordEmailSchema(t).safeParse(email);
  if (!result.success) {
    return {
      status: false,
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
        status: false,
        message: data.message || 'Failed to send email',
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
      status: false,
      message: 'Link expired or invalid',
    };
  }
  const t = await getTranslations('forgotPw');
  // validate the reset password form
  const result = resetPasswordSchema(t).safeParse(values);
  if (!result.success) {
    return {
      status: false,
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
        status: false,
        message: data.message || 'Failed to reset password',
      };
    }
    return data;
  } catch (error) {
    return {
      status: false,
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong',
    };
  }
};
