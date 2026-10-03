export type PaymentMethodType = 'CASH' | 'CARD';

export interface PaymentMethodProps {
  paymentMethod: PaymentMethodType | null;
  onPaymentChange: (value: PaymentMethodType) => void;
  onBack: () => void;
  onCheckout?: () => void;
  isLoading?: boolean;
}
export interface CreateOrderBody {
  addressId: string;
  paymentMethod: 'CASH_ON_DELIVERY' | 'CREDIT_CARD';
  couponCode?: string;
  notes?: string;
  successUrl?: string;
}
