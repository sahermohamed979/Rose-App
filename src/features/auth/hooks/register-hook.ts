import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../apis/register-action';
import {
  RegisterSchemaType,
  RegisterResponse,
} from '../types/register-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../schemas/register-schema';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function useRegister() {
  const router = useRouter();
  const t = useTranslations();
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
    mode: 'onSubmit',
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

  // Registration mutation handling
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: RegisterSchemaType) => {
      const response = await registerUser(values);

      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: (response) => {
      router.push('/login');
    },

    onError: (error) => {},
  });

  const onSubmit = (values: RegisterSchemaType) => {
    console.log('Sending to API:', values);
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
