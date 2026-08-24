'use client';

import { useMutation } from '@tanstack/react-query';
import { deleteAccount } from '../apis/delete-account.api';

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
  });
};
