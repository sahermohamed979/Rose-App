'use client';

import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginFormValues } from '../_schema/login.schema';

export default function useLogin() {
  // --- State ---
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  // --- Mutation ---
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

      // Return rememberMe so onSuccess can upgrade the cookie if needed
      return { rememberMe: values.rememberMe };
    },
    onSuccess: async ({ rememberMe }) => {
      // If "Remember me" was checked, upgrade the session cookie to a
      // persistent cookie (maxAge: 30 days) via the remember endpoint.
      // Without this, the cookie is a session cookie and is deleted on browser close.
      if (rememberMe) {
        await fetch('/api/auth/remember', { method: 'POST' });
      }

      const callbackUrl =
        new URLSearchParams(window.location.search).get(
          'callbackUrl'
        ) || '/';

      router.push(callbackUrl);
      router.refresh();
    },
    onError: (error: Error) => {
      setApiError(error.message);
      console.error('[login error]', error.message);
    },
  });

  return { isPending, apiError, login };
}
