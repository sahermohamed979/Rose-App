import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '../apis/register-action';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
// import { EmailVerificationSchemaType } from "../types/register-types";
// import { emailVerificationSchema } from "../schemas/register-schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

export function useEmailVerification() {
  const { mutate, isPending } = useMutation({
    mutationFn: async (email: string) => {
      const result = await verifyEmail(email);
      if (!result.status) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    verifyEmailMutate: mutate,
    isVerifyEmailPending: isPending,
  };
}
