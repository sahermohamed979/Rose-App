'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  confirmEmailChange,
  requestEmailChange,
} from '../apis/change-email.api';

export const useRequestEmailChange = () => {
  return useMutation({
    mutationFn: requestEmailChange,
  });
};

export const useConfirmEmailChange = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: confirmEmailChange,
    onSuccess: (result) => {
      if (result.status) {
        router.refresh();
      }
    },
  });
};
