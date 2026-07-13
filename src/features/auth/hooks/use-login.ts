import { useMutation } from '@tanstack/react-query';
import { LoginFormData } from '../schemas/login-schema';
import { signIn } from 'next-auth/react';

export const useLoginMutation = () => {
  // Hooks

  return useMutation({
    mutationFn: async (values: LoginFormData) => {
      const result = await signIn('credentials', {
        redirect: false,
        username: values.username,
        password: values.password,
        rememberMe: values.rememberMe,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      const callbackUrl =
        new URLSearchParams(window.location.search).get(
          'callbackUrl'
        ) || '/';
      location.href = callbackUrl;
    },
  });
};
