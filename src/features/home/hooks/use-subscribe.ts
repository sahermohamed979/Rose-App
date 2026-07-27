'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { SubscribeFormValues } from '../schemas/subscribe.schema';
import { subscribeToNewsletter } from '../apis/subscribe.api';

/**
 * Custom hook to manage the newsletter subscription mutation lifecycle.
 * Handles state for errors and success status.
 */
export default function useSubscribe() {
  // --- State ---
  const [subscribeError, setSubscribeError] = useState<string | null>(
    null
  );
  const [subscribeSuccess, setSubscribeSuccess] =
    useState<boolean>(false);

  // --- Mutation ---
  const { isPending, mutate: subscribe } = useMutation({
    mutationFn: async (values: SubscribeFormValues) => {
      setSubscribeError(null);
      setSubscribeSuccess(false);

      const res = await subscribeToNewsletter(values);
      if (!res.success) {
        throw new Error(res.message || 'Subscription failed');
      }
      return res;
    },
    onSuccess: () => {
      setSubscribeSuccess(true);
    },
    onError: (error: Error) => {
      setSubscribeError(error.message);
      console.error('[Subscription Error]', error.message);
    },
  });

  return {
    subscribe,
    isPending,
    subscribeError,
    subscribeSuccess,
  };
}
