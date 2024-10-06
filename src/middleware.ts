import { NextRequest, NextResponse } from 'next/server';
import { EnumTokens } from './services/auth/auth.helper';
import authService from './services/auth/auth.service';
import { jwtVerify } from 'jose';
import { ITokenInside } from './services/auth/auth.types';

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
  let accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;

  const isHomePage = request.url.includes('/');

  //   if (!refreshToken) {
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   }

  if (!accessToken) {
    try {
      const data = await authService.getNewTokensByRefresh(refreshToken);
      accessToken = data.accessToken;
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  try {
    const response = await jwtVerify(
      accessToken,
      new TextEncoder().encode(`${process.env.JWT_SECRET}`)
    );

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/'],
};
