import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';
import { LoginFormData } from '../schemas/login-schema';
import { signIn } from 'next-auth/react';

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: LoginFormData) => {
      const result = await signIn('credentials', {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      router.push('/dashboard');
    },
  });
};
