import { useMutation } from '@tanstack/react-query';
import { forgetPassword } from '../apis/forget-reset-password-action';
import { emailInput } from '../types/forget-reset-password-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { emailSchema } from '../schemas/forget-password-schema';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export function useForgetPassword() {
  // Translation
  const t = useTranslations();
  // State

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  // hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<emailInput>({
    defaultValues: { email: '' },
    mode: 'onSubmit',
    resolver: zodResolver(emailSchema),
  });

  // Submit Email mutation
  const onSubmitEmail = async (values: emailInput) => {
    mutate(values);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: emailInput) => {
      const response = await forgetPassword(values);
      return response;
    },

    onSuccess: (response, data: emailInput) => {
      setStep(2);
      setEmail(data.email);
      toast.success(t('forgotPw.step1.emailSentSuccess'));
    },
    onError: () => {
      toast.error(t('forgotPw.step1.emailSentError'));
    },
  });

  return {
    mutate,
    isPending,
    handleSubmit,
    control,
    step,
    setStep,
    email,
    errors,
    onSubmitEmail,
  };
}
