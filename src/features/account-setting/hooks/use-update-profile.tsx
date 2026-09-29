'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { updateProfile } from '../apis/update-profile.api';

export const useUpdateProfile = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (result) => {
      if (result.status) {
        router.refresh();
      }
    },
  });
};
