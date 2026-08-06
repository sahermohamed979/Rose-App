export type PaymentMethodType = 'CASH' | 'CARD';

export interface PaymentMethodProps {
  paymentMethod: PaymentMethodType | null;
  onPaymentChange: (value: PaymentMethodType) => void;
  onBack: () => void;
  onCheckout: () => void;
  isLoading: boolean;
}
