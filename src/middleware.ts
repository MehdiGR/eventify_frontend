import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  const pathname = request.nextUrl.pathname;

  // If no token exists, redirect to login unless the route is public
  if (!token) {
    if (pathname.startsWith('/auth')) {
      return NextResponse.next(); // Allow access to auth pages
    }
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Fetch user data from the API using the token
  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!userResponse.ok) {
    // Token is invalid or expired, redirect to login
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const user = await userResponse.json();

  // Role-based redirection
  if (user.role === 'organizer' && !pathname.startsWith('/organizer')) {
    return NextResponse.redirect(new URL('/organizer/dashboard', request.url));
  }

  if (user.role === 'admin' && !pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Allow access to other routes
  return NextResponse.next();
}

// Define which routes the middleware should apply to
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|auth).*)', // Exclude static files and API routes
  ],
};
