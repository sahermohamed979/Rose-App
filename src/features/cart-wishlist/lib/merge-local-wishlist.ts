import { addToWishlistAction } from '../apis/wishlist-actions';
import {
  clearLocalWishlist,
  getLocalWishlist,
} from './local-wishlist-client';

export async function mergeLocalWishlistToServer(): Promise<void> {
  const localWishlist = getLocalWishlist();

  if (!localWishlist.length) {
    return;
  }

  await Promise.all(
    localWishlist.map((productId) => addToWishlistAction(productId))
  );

  clearLocalWishlist();
}
