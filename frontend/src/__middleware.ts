import { NextResponse } from 'next/server';
import { parseCookie } from './utils/utilities';
import { COOKIE, ROUTE } from './utils/constants';
import type { NextRequest } from 'next/server';

/**
 * @description Authentication middleware
 * @author Luca Cattide
 * @date 28/09/2025
 * @export
 * @param {NextRequest} request
 * @returns {*}
 */
export function middleware(request: NextRequest) {
  const { AUTHENTICATION, NEW, NOTES, NOTE, SETTINGS } = ROUTE;
  const token =
    request.cookies.get(COOKIE.REFRESH) ??
    parseCookie(request.headers.get(COOKIE.REFRESH));
  const protectedRoutes = [NEW.PATH, NOTES.PATH, NOTE.PATH, SETTINGS.PATH];
  // All pages except the authentication one
  const isProtectedRoute = protectedRoutes.some((protectedRoute) =>
    request.nextUrl.pathname.startsWith(protectedRoute),
  );
  let response = NextResponse.next();

  if (isProtectedRoute && !token) {
    response = NextResponse.redirect(
      new URL(AUTHENTICATION.PATH, request.nextUrl),
    );
  } else if (token) {
    response = NextResponse.redirect(
      new URL(request.nextUrl.pathname, request.nextUrl),
    );
  }

  return response;
}

/**
 * Middleware scope configuration
 * Match all pages except API routes and static resources
 */
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
