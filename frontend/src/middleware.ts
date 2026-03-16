import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('user_role')?.value; 
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/login' || pathname === '/register';
  const isAdminRoute = pathname.startsWith('/admin');
  const isProtectedRoute = pathname === '/' || pathname.startsWith('/order') || isAdminRoute;

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAdminRoute && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}