import { useMutation } from '@tanstack/react-query';
import { updateCartItemAction } from '../apis/cart-actions';

export default function useUpdateCartQuantity() {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      id,
      quantity,
    }: {
      id: string;
      quantity: number;
    }) => {
      const res = await updateCartItemAction(id, quantity);
      if (!res.status) {
        throw new Error(res.message);
      }
      return res;
    },
  });

  return { mutate, isPending };
}
