import { useQuery } from '@tanstack/react-query';
import { getUserAddresses } from '../apis/get-user-adresses.api';
import { AddressesPayload } from '@/shared/lib/types/adresses.type';

export function useUserAddresses(initialData?: AddressesPayload) {
  return useQuery<AddressesPayload, Error>({
    queryKey: ['user-addresses'],

    queryFn: async () => {
      const response = await getUserAddresses();

      if (!response.status) {
        throw new Error(response.message);
      }

      return response.payload;
    },

    initialData,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
