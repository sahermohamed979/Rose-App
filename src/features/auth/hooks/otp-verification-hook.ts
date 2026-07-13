import { useMutation } from '@tanstack/react-query';
import { confirmEmailVerification } from '../apis/register-action';
import {
  OtpConfirmApiResponse,
  OtpVerificationSchemaType,
} from '../types/register-types';
import { mapOtpBackendError } from '../utils/map-otp-error';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

type OtpConfirmInput = OtpVerificationSchemaType & { email: string };
type OtpConfirmSuccess = Extract<
  OtpConfirmApiResponse,
  { status: true }
>;

function translateOtpError(
  t: ReturnType<typeof useTranslations<'register'>>,
  key: string
) {
  if (key === 'expired') {
    return t('otp.expired');
  }
  return t('otp.invalid');
}

export function useOtpVerification() {
  const t = useTranslations('register');

  const { mutate, isPending } = useMutation<
    OtpConfirmSuccess,
    Error,
    OtpConfirmInput
  >({
    mutationFn: async (data) => {
      const response = await confirmEmailVerification(data);

      if (!response.status) {
        throw new Error(mapOtpBackendError(response.errors));
      }

      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(translateOtpError(t, error.message));
    },
  });

  return {
    confirmOtpMutate: mutate,
    isConfirmOtpPending: isPending,
  };
}
