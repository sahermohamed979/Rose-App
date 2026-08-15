import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../apis/create-order.api';

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
  });
}
