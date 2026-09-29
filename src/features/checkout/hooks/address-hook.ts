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
  type UpdateAddressPayload,
} from '../schemas/address-form-schema';
import {
  createAddress,
  updateAddress,
  deleteAddress,
} from '../apis/address-action';
import { IAddress } from '@/shared/lib/types/adresses.type';

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

  // Functions
  const handleMutationSuccess = (message: string) => {
    toast.success(message);
    options?.onSuccess?.();
    router.refresh();
  };

  // Mutations
  const createMutation = useMutation({
    mutationFn: async (address: CreateAddressPayload) => {
      const response = await createAddress(address);

      if (!response.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      handleMutationSuccess(t('address.added'));
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (address: UpdateAddressPayload) => {
      const response = await updateAddress(address);

      if (!response.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      handleMutationSuccess(t('address.updated'));
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteAddress(id);
      if (!response.status) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: () => {
      handleMutationSuccess(t('address.deleted'));
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return {
    control,
    mutate: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
    handleSubmit,
    trigger,
    formState,
    setValue,
    watch,
    getValues,
  };
}
