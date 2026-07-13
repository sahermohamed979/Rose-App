import createMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Auth pages - logged in users can't visit these
const authPages = ['/login', '/register', '/forgot-password'];

// Protected pages - guests can't visit these
const protectedPages = ['/dashboard', '/profile', '/home'];

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isLoggedIn = !!token;

  const pathname = req.nextUrl.pathname;

  // Remove locale prefix to get clean path, and capture the active locale
  // e.g. /en/login → cleanPath: /login, locale: en
  const localeMatch = pathname.match(/^\/([a-z]{2})/);
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;
  const cleanPath = pathname.replace(/^\/[a-z]{2}/, '');

  const isAuthPage = authPages.some((page) =>
    cleanPath.startsWith(page)
  );
  const isProtectedPage = protectedPages.some((page) =>
    cleanPath.startsWith(page)
  );

  // Logged in user tries to visit login/register → redirect to locale home
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // Guest tries to visit protected page → redirect to locale login
  if (!isLoggedIn && isProtectedPage) {
    const returnUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/${locale}/login?returnUrl=${returnUrl}`, req.url)
    );
  }

  //  next-intl
  return intlMiddleware(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
