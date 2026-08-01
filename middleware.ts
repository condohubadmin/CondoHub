import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/auth/sign-in', '/auth/sign-up', '/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith('/auth'));
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const hasSessionCookie = request.cookies.getAll().some((cookie) => cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token'));

  if ((pathname === '/auth/sign-in' || pathname === '/auth/sign-up') && hasSessionCookie) {
    const dashboardUrl = new URL('/dashboard/usuarios', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (isDashboardRoute && !hasSessionCookie) {
    const signInUrl = new URL('/auth/sign-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/sign-in', '/auth/sign-up'],
};
