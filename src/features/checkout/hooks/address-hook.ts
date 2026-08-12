import { addressFormSchema } from '../schemas/address-form-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { AddressFormFields } from '../schemas/address-form-schema';
import { createAddress } from '../apis/address-action';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

export function useAddress(initialData?: Partial<AddressFormFields>) {
  const t = useTranslations();
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
      city: initialData?.city ?? '',
      street: initialData?.street ?? '',
      phone: initialData?.phone ?? '',
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (address: AddressFormFields) => {
      const response = await createAddress(address);

      if (!response.status) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      toast.success('Address created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  const onSubmit = (data: AddressFormFields) => {
    mutate(data);
  };
  return {
    control,
    mutate: onSubmit,
    isPending,
    handleSubmit,
    trigger,
    formState,
    setValue,
    watch,
    getValues,
  };
}
