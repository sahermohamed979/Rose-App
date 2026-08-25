'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { useDeleteAccount } from './use-delete-account';

export function useDeleteAccountFlow() {
  const t = useTranslations('profileForm.toast');
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteAccountMutation, isPending } =
    useDeleteAccount();

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  const handleDelete = () => {
    deleteAccountMutation(undefined, {
      onSuccess: async (result) => {
        if (!result.status) {
          toast.error(result.message);
          return;
        }

        toast.success(t('accountDeleted'));

        await signOut({
          callbackUrl: '/',
        });
      },
    });
  };

  return {
    isOpen,
    open,
    close,
    handleDelete,
    isDeleting: isPending,
  };
}
