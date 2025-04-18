import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// These routes can be accessed without auth
const PUBLIC_ROUTES = ['/', '/login', '/register'];

// Define secret here — should match backend's signing secret
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Allow public routes without JWT
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // If token is missing
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const role = payload?.role;

    // 🛡 Role-based route guards
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.startsWith('/beekeeper') && role !== 'beekeeper') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error('JWT verify failed:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Apply middleware only on protected routes
export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/beekeeper/:path*'],
};
