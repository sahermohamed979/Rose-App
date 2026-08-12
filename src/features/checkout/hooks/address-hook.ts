'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from '@/i18n/navigation';

import {
  addressFormSchema,
  type AddressFormFields,
  type CreateAddressPayload,
} from '../schemas/address-form-schema';
import { createAddress } from '../apis/address-action';

interface UseAddressOptions {
  initialData?: Partial<AddressFormFields>;
  onSuccess?: () => void;
}

export function useAddress(options?: UseAddressOptions) {
  // Translations
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Form
  const schema = addressFormSchema(t);
  const {
    control,
    handleSubmit,
    trigger,
    formState,
    setValue,
    watch,
    getValues,
  } = useForm<AddressFormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: options?.initialData?.title ?? '',
      city: options?.initialData?.city ?? '',
      street: options?.initialData?.street ?? '',
      phone: options?.initialData?.phone ?? '',
    },
  });

  // Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (address: CreateAddressPayload) => {
      const response = await createAddress(address);

      if (!response.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      toast.success(t('address.added'));
      options?.onSuccess?.();
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    control,
    mutate,
    isPending,
    handleSubmit,
    trigger,
    formState,
    setValue,
    watch,
    getValues,
  };
}
