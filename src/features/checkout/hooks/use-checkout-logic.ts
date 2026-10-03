import { useCheckout } from '../context/checkout-context';

export default function useCheckoutLogic() {
  const context = useCheckout();

  if (!context) {
    throw new Error(
      'useCheckoutLogic must be used within a <CheckoutProvider>.'
    );
  }

  return context;
}
