import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '../apis/register-action';
import { toast } from 'sonner';

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
