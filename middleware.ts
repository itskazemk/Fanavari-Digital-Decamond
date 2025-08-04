import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the URL is not /dashboard or /auth (including subpaths)
  if (!pathname.startsWith('/dashboard') && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow the request to proceed if it matches /dashboard or /auth
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};