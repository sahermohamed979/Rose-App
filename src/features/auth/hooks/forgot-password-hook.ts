import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../apis/forgot-reset-password-action';
import { EmailInput } from '../types/forget-reset-password-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { emailSchema } from '../schemas/forget-password-schema';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export function useForgetPassword() {
  // Translation
  const t = useTranslations('forgotPw');
  // State
  const [step, setStep] = useState(2);
  const [email, setEmail] = useState('');

  //schema
  const schema = emailSchema(t);
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
    mutate(values);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: EmailInput) => {
      const response = await forgotPassword(values);

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
