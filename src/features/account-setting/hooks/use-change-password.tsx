import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { UseFormSetError } from 'react-hook-form';
import { changePassword } from '../apis/change-password.api';
import { ChangePasswordValues } from '../schemas/change-password.schema';

export const useChangePassword = (
  setError: UseFormSetError<ChangePasswordValues>
) => {
  // Translations
  const t = useTranslations('changePassword');

  return useMutation({
    mutationFn: async (data: ChangePasswordValues) => {
      return await changePassword(data);
    },
    onSuccess: (response) => {
      if (!response || response.status === false) {
        // Session Expired
        if (response?.code === 419) {
          return signOut({ callbackUrl: '/login' });
        }

        // Incorrect Current Password
        if (response?.code === 401) {
          const message = t('incorrectCurrent');
          setError('currentPassword', { message });
          return;
        }

        // Global Error
        toast.error(response?.message || t('error'));
        return;
      }

      // Success
      toast.success(t('success'));
      setTimeout(() => {
        void signOut({ redirect: true, callbackUrl: '/login' });
      }, 2000);
    },
    onError: () => {
      // Mutation Error
      toast.error(t('error'));
    },
  });
};
