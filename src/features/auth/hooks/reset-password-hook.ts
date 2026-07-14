'use client';
import { useForm } from 'react-hook-form';
import { resetPasswordSchema } from '../schemas/reset-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordInput } from '../types/forget-reset-password-types';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../apis/forgot-reset-password-action';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

export default function useResetPassword() {
  // TRANSLATIONS
  const t = useTranslations('forgotPw');

  // searchPrams
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  //schema
  const schema = resetPasswordSchema(t);
  // FORM
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  });

  // handle submit data that comes from the controller and pass it to the mutation
  const onSubmit = (data: ResetPasswordInput) => {
    mutate(data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ResetPasswordInput) => {
      // check if the token is valid

      if (!token) {
        throw new Error(t('step3.linkExpiredOrInvalid'));
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
      toast.success(t('step3.passwordResetSuccess'));

      router.replace('/');
    },
    onError: (error) => {
      toast.error(error.message ?? t('step3.linkExpiredOrInvalid'));
    },
  });

  return { control, handleSubmit, errors, onSubmit, isPending };
}
