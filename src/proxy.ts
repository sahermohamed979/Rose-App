import createMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Auth pages - logged in users can't visit these
export const authPages = ['/login', '/register', '/forgot-password'];

// Protected pages - guests can't visit these
const protectedPages = [
  '/dashboard',
  '/profile',
  '/checkout',
  '/account-setting',
  '/orders',
  '/dashboard',
];

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isLoggedIn = !!token;

  const pathname = req.nextUrl.pathname;
  const locale = pathname.split('/')[1] || 'en';

  // Remove locale prefix to get clean path
  // /en/login → /login
  const cleanPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');

  const isAuthPage = authPages.some((page) =>
    cleanPath.startsWith(page)
  );
  const isProtectedPage = protectedPages.some((page) =>
    cleanPath.startsWith(page)
  );

  // Logged in user tries to visit login/register
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // Guest tries to visit protected page
  if (!isLoggedIn && isProtectedPage) {
    const returnUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/${locale}/login?returnUrl=${returnUrl}`, req.url)
    );
  }
  // Reset password protected page
  if (cleanPath.startsWith('/reset-password')) {
    const searchParamsToken = req.nextUrl.searchParams.get('token');

    if (!searchParamsToken) {
      return NextResponse.redirect(
        new URL(`/${locale}/forgot-password`, req.url)
      );
    }
  }
  //  next-intl
  return intlMiddleware(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
