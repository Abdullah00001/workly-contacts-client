import { NextResponse, type NextRequest } from 'next/server';

const protectedRoutes = [
  '/dashboard',
  '/favorites',
  '/trash',
  '/suggestion',
  '/people/*',
  '/label/*',
  '/accountcenter/*',
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const actvToken = request.cookies.get('actv_token')?.value;
  const accessToken = request.cookies.get('accesstoken')?.value;
  const refreshToken = request.cookies.get('refreshtoken')?.value;
  const isAuthPages = pathname.includes('/auth');
  const isProtectedRoute = protectedRoutes.some((route) => {
    if (route.endsWith('/*')) {
      return pathname.startsWith(route.slice(0, -2));
    }
    return pathname === route;
  });
  if (!accessToken && refreshToken) {
    try {
      const refreshTokenResponse = await fetch(
        `${process.env.API_BASE_URL}/auth/refresh`,
        {
          method: 'POST',
          headers: {
            Cookie: `refreshtoken=${refreshToken}`,
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );
      if (refreshTokenResponse.ok) {
        const setCookieHeaders = refreshTokenResponse.headers.get('set-cookie');
        const response = NextResponse.next();
        if (setCookieHeaders) {
          const cookies = setCookieHeaders
            .split(',')
            .map((cookie) => cookie.trim());
          cookies.forEach((cookie) => {
            response.headers.append('Set-Cookie', cookie);
          });
        }
        return response;
      } else {
        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.delete('accesstoken');
        response.cookies.delete('refreshtoken');
        return response;
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('accesstoken');
      response.cookies.delete('refreshtoken');
      return response;
    }
  }
  if (isAuthPages && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (actvToken && pathname !== '/auth/verify') {
    return NextResponse.redirect(new URL('/auth/verify', request.url));
  }
  if (isProtectedRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
