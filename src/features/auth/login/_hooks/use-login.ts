'use client';

import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginFormValues } from '../_schema/login.schema';

export default function useLogin() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const { isPending, mutate: login } = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      setApiError(null);
      // Calls NextAuth's internal API route which proxies to the real backend
      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
        redirect: false,
      });

      if (!response?.ok || response?.error) {
        throw new Error(
          response?.error ||
            'Login failed. Please check your credentials.'
        );
      }

      return response;
    },
    onSuccess: () => {
      const callbackUrl =
        new URLSearchParams(window.location.search).get(
          'callbackUrl'
        ) || '/';

      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 1500);
    },
    onError: (error: Error) => {
      setApiError(error.message);
      console.error('[login error]', error.message);
    },
  });

  return { isPending, apiError, login };
}
