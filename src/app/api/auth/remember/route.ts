import { NextRequest, NextResponse } from 'next/server';

// Cookie name is prefixed with __Secure- in production (HTTPS only)
const SESSION_COOKIE_NAME =
  process.env.NODE_ENV === 'production'
    ? '__Secure-next-auth.session-token'
    : 'next-auth.session-token';

const REMEMBER_ME_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

/**
 * POST /api/auth/remember
 *
 * Upgrades the existing NextAuth session cookie from a session cookie
 * (no maxAge, deleted on browser close) to a persistent cookie (30 days).
 *
 * Called client-side after a successful login when "Remember me" is checked.
 */
export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return NextResponse.json(
      { error: 'No active session found' },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });

  // Re-set the same cookie value but now WITH a maxAge,
  // converting it from a session cookie to a persistent cookie.
  response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: REMEMBER_ME_MAX_AGE,
  });

  return response;
}
