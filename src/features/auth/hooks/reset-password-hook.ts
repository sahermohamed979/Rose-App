'use client';
import { useForm } from 'react-hook-form';
import { resetPasswordSchema } from '../schemas/reset-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordInput } from '../types/forget-reset-password-types';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../apis/forget-reset-password-action';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export default function useRestPassword(token: string) {
  // TRANSLATIONS
  const t = useTranslations();
  // FORM
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(resetPasswordSchema),
  });

  // handle submit data that comes from the controller and pass it to the mutation
  const onSubmit = (data: ResetPasswordInput) => {
    mutate(data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ResetPasswordInput) => {
      // check if the token is valid
      if (!token) {
        throw new Error(t('forgotPw.step3.linkExpiredOrInvalid'));
      }

      // call the reset password api
      const response = await resetPassword(token, values);
      // check if the response is not success
      if (!response.status) {
        throw new Error(response.message);
      }

      return response;
    },

    onSuccess: () => {
      toast.success(t('forgotPw.step3.passwordResetSuccess'));
    },
    onError: (error) => {
      toast.error(
        t('forgotPw.step3.linkExpiredOrInvalid') ?? error.message
      );
    },
  });

  return { control, handleSubmit, errors, onSubmit, isPending };
}
