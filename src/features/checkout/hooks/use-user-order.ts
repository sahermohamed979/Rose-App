import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../apis/create-order.api';
import { confirmCardPayment } from '../apis/confirm-payment.api';
import { createPaymentIntent } from '../apis/create-payment-intent.api';

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
  });
}

export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: createPaymentIntent,
  });
}

export function useConfirmCardPayment() {
  return useMutation({
    mutationFn: confirmCardPayment,
  });
}
