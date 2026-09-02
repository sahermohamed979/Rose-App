'use client';
import { useMutation } from '@tanstack/react-query';
import { Loader, Trash2 } from 'lucide-react';
import removeProductactions from '../apis/remove-product-action';

import { toast } from 'sonner';
import { useRouter } from '@/i18n/navigation';

export default function RemoveProduct({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: removeProductactions,
    mutationKey: ['Remove-product'],
    onSuccess: (_data) => {
      toast.success('Product removed from wishlist');
      router.refresh();
    },
    onError: (_error) => {},
  });
  return (
    <div>
      {isPending ? (
        <Loader size={20} className="animate-spin" />
      ) : (
        <Trash2
          onClick={() => {
            mutate(productId);
          }}
          className="cursor-pointer"
          size={20}
          strokeWidth={1.25}
        />
      )}
    </div>
  );
}
