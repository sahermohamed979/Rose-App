import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { changePassword } from '../apis/change-password.api';
import { ChangePasswordValues } from '../schemas/change-password.schema';
import { useTranslations } from 'next-intl';

export const useChangePassword = () => {
  const t = useTranslations('ChangePasswordForm');

  return useMutation({
    mutationFn: async (data: ChangePasswordValues) => {
      return await changePassword(data);
    },
    onSuccess: (response) => {
      if (response.code === 401) {
        toast.error(t('messages.currentPasswordInvalid'));
        return;
      }
      toast.success(t('messages.changePasswordSuccess'));
      setTimeout(() => {
        signOut({ redirect: true, callbackUrl: '/login' });
      }, 2000);
    },
    onError: (error: Error) => {
      toast.error(t('messages.changePasswordError'));
    },
  });
};
