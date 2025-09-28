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
  const { AUTHENTICATION } = ROUTE;
  const token =
    request.cookies.get(COOKIE.REFRESH) ??
    parseCookie(request.headers.get(COOKIE.REFRESH));
  // All pages except the authentication one
  const isProtectedRoute = !request.nextUrl.pathname.startsWith(
    AUTHENTICATION.PATH,
  );
  let response = NextResponse.next();

  if (isProtectedRoute && !token) {
    response = NextResponse.redirect(
      new URL(ROUTE.AUTHENTICATION.PATH, request.nextUrl),
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
