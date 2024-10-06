import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  const protectedRoutes = ['/', '/admin'];

  if (
    protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      await jwtVerify(
        accessToken,
        new TextEncoder().encode(`${process.env.JWT_SECRET}`)
      );
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*'],
};
