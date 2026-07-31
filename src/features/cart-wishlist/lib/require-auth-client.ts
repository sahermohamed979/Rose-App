'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from '@/i18n/navigation';

/**
 * Client-side auth gate for cart/wishlist mutations.
 * Returns false and redirects to login when the user is a guest.
 * Uses `callbackUrl` to match `use-login.ts` after successful login.
 */
export function useRequireAuth() {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  function ensureAuth(): boolean {
    if (status === 'authenticated') {
      return true;
    }

    // Avoid redirecting while session is still resolving
    if (status === 'loading') {
      return false;
    }

    const callbackUrl = encodeURIComponent(pathname);
    router.push(`/login?callbackUrl=${callbackUrl}`);
    return false;
  }

  return {
    ensureAuth,
    status,
    isAuthenticated: status === 'authenticated',
  };
}
