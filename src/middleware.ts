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
  const { pathname, searchParams } = request.nextUrl;
  const actvToken = request.cookies.get('actv_token')?.value;
  const accessToken = request.cookies.get('accesstoken')?.value;
  const refreshToken = request.cookies.get('refreshtoken')?.value;
  const createPasswordPageToken = request.cookies.get('pass_rqrd')?.value;
  const clearSessionToken = request.cookies.get('__clear_device')?.value;
  const r_stp1 = request.cookies.get('r_stp1')?.value;
  const r_stp2 = request.cookies.get('r_stp2')?.value;
  const r_stp3 = request.cookies.get('r_stp3')?.value;
  const url = request.nextUrl.clone();
  const isAuthPages = pathname.includes('/auth');
  const isProtectedRoute = protectedRoutes.some((route) => {
    if (route.endsWith('/*')) {
      return pathname.startsWith(route.slice(0, -2));
    }
    return pathname === route;
  });
  if (
    createPasswordPageToken &&
    accessToken &&
    refreshToken &&
    pathname !== '/auth/create-password'
  ) {
    return NextResponse.redirect(new URL('/auth/create-password', request.url));
  }
  if ((accessToken || refreshToken) && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (
    isAuthPages &&
    (accessToken || refreshToken) &&
    pathname !== '/auth/create-password'
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (actvToken && pathname !== '/auth/verify') {
    return NextResponse.redirect(new URL('/auth/verify', request.url));
  }
  if (clearSessionToken && pathname !== '/auth/clear-session') {
    return NextResponse.redirect(new URL('/auth/clear-session', request.url));
  }
  if (isProtectedRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (pathname.startsWith('/auth/recover')) {
    const step = searchParams.get('step');
    if (step === 'identify' && !r_stp1) {
      url.searchParams.set('step', 'initiate');
      return NextResponse.redirect(url);
    }

    if (step === 'verify_otp' && !r_stp2) {
      url.searchParams.set('step', 'initiate');
      return NextResponse.redirect(url);
    }

    if (step === 'reset_password' && !r_stp3) {
      url.searchParams.set('step', 'initiate');
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
