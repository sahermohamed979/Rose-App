'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProfile } from '../apis/update-profile.api';
import { PROFILE_QUERY_KEY } from './use-profile';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (result) => {
      if (result.status) {
        queryClient.invalidateQueries({
          queryKey: PROFILE_QUERY_KEY,
        });
      }
    },
  });
};
