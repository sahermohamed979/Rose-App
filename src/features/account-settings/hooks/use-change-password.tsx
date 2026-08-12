import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { changePassword } from '../apis/change-password.api';
import { ChangePasswordValues } from '../schemas/change-password.schema';
import { useTranslations } from 'next-intl';

export const useChangePassword = () => {
  const t = useTranslations('changePassword');

  return useMutation({
    mutationFn: async (data: ChangePasswordValues) => {
      return await changePassword(data);
    },
    onSuccess: (response) => {
      if (!response || response.status === false) {
        toast.error(
          response?.code === 401
            ? t('incorrectCurrent')
            : response?.message || t('error')
        );
        return;
      }

      toast.success(t('success'));
      setTimeout(() => {
        signOut({ redirect: true, callbackUrl: '/login' });
      }, 2000);
    },
    onError: () => {
      toast.error(t('error'));
    },
  });
};
