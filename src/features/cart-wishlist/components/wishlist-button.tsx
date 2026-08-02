import { Button } from '@/shared/components/ui/button';
import { HeartMinusIcon, HeartPlusIcon } from 'lucide-react';
import { useToggleWishlist } from '../hooks/use-toggle-wishlist';
import { useWishlist } from '../hooks/use-wishlist';
import { useSession } from 'next-auth/react';
import { cn } from '@/shared/lib/utils/utils';

interface WishlistButtonProps {
  isAddedToWishlist?: boolean;
  productId: string;
  className?: string;
  addedClassName?: string;
  notAddedClassName?: string;
}

export default function WishlistButton({
  isAddedToWishlist,
  productId,
  className,
  addedClassName,
  notAddedClassName,
}: WishlistButtonProps) {
  const { status } = useSession();
  const { handleToggleWishlist, isPending } = useToggleWishlist();
  const { data: wishlistData } = useWishlist(
    status === 'authenticated'
  );
  const isProductInWishlist =
    wishlistData?.payload?.wishlistItems?.some(
      (item) => item.productId === productId
    ) ?? false;
  const isAdded = isAddedToWishlist ?? isProductInWishlist;

  const onToggleWishlist = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    handleToggleWishlist({ productId, isAddedToWishlist: isAdded });
  };

  return (
    <>
      {isAdded ? (
        <Button
          className={cn(
            `w-7.5 
      h-7.5 rounded-full bg-bg-inverse enabled:hover:bg-bg-inverse enabled:text-text-white
       p-0  overflow-hidden group transition-all duration-300 hover:w-39.25`,
            className,
            addedClassName
          )}
          onClick={onToggleWishlist}
          disabled={isPending}
        >
          <HeartMinusIcon className="w-4.5 h-4.5 text-text-white" />
          <span className="text-text-white text-[12px] font-medium hidden group-hover:block">
            Remove from Wishlist
          </span>
        </Button>
      ) : (
        <Button
          className={cn(
            `w-7.5 
    h-7.5 rounded-full bg-bg-plain enabled:hover:bg-bg-plain
     p-0  overflow-hidden group transition-all duration-300 hover:w-30.25`,
            className,
            notAddedClassName
          )}
          onClick={onToggleWishlist}
          disabled={isPending}
        >
          <HeartPlusIcon className="w-4.5 h-4.5 text-text-primary " />
          <span className="text-text-primary text-[12px] font-medium hidden group-hover:block">
            Add to Wishlist
          </span>
        </Button>
      )}
    </>
  );
}
