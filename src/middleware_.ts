import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  const pathname = request.nextUrl.pathname;

  // Allow unrestricted access to auth pages
  if (pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  // If no token exists, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Fetch user data using GET
  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }, // GET request
  });

  // Token invalid/expired
  if (!userResponse.ok) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const user = await userResponse.json();

  // Redirect root path based on role
  if (pathname === '/') {
    if (user.role === 'organizer') {
      return NextResponse.redirect(new URL('/organizer/dashboard', request.url));
    }
    if (user.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  // Ensure role-based access to protected routes
  if (pathname.startsWith('/organizer') && user.role !== 'organizer') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (pathname.startsWith('/admin') && user.role !== 'admin') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
