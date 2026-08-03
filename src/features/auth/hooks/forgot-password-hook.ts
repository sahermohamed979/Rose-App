import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../apis/forgot-reset-password-action';
import { EmailInput } from '../types/forget-reset-password-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { forgotPasswordEmailSchema } from '../schemas/forget-password-schema';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export function useForgetPassword() {
  // Translation
  const t = useTranslations('forgotPw');
  // State
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  //schema
  const schema = forgotPasswordEmailSchema(t);
  // hook form

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailInput>({
    defaultValues: { email: '' },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  });

  // Submit Email mutation
  const onSubmitEmail = async (values: EmailInput) => {
    const body = {
      ...values,
      redirectUrl: `${window.location.origin}/reset-password`,
    };
    mutate(body);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (body: EmailInput) => {
      const response = await forgotPassword(body);

      if (!response.status) {
        throw new Error(response.message);
      }
      return response;
    },

    onSuccess: (response, data: EmailInput) => {
      setStep(2);
      setEmail(data.email);
      toast.success(t('step1.emailSentSuccess'));
    },
    onError: (error: Error) => {
      toast.error(error.message || t('step3.linkExpiredOrInvalid'));
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
