'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  confirmEmailChange,
  requestEmailChange,
} from '../apis/change-email.api';
import { PROFILE_QUERY_KEY } from './use-profile';

export const useRequestEmailChange = () => {
  return useMutation({
    mutationFn: requestEmailChange,
  });
};

export const useConfirmEmailChange = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmEmailChange,
    onSuccess: (result) => {
      if (result.status) {
        queryClient.invalidateQueries({
          queryKey: PROFILE_QUERY_KEY,
        });
      }
    },
  });
};
