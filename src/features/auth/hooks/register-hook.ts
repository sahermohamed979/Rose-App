'use client';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../apis/register-action';
import { RegisterSchemaType } from '../types/register-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../schemas/register-schema';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useRouter } from '@/i18n/navigation';

export function useRegister() {
  const router = useRouter();
  const t = useTranslations('register');
  // form schema with translations
  const schema = registerSchema(t);

  // Form initialization with Zod validation
  const {
    control,
    handleSubmit,
    register,
    trigger,
    formState,
    setValue,
    watch,
    getValues,
  } = useForm<RegisterSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    shouldUnregister: false,
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      gender: undefined,
      phone: '',
    },
  });

  // Handle registration API call
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: RegisterSchemaType) => {
      const response = await registerUser(values);

      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: () => {
      router.push('/login');
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
  // Wrap mutation for form submission
  const onSubmit = (values: RegisterSchemaType) => {
    mutate(values);
  };

  return {
    mutate: onSubmit,
    isPending,
    handleSubmit,
    control,
    errors: formState.errors,
    register,
    trigger,
    setValue,
    watch,
    getValues,
    formState,
  };
}
