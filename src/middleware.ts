import { NextResponse, type NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const actvToken = request.cookies.get('actv_token')?.value;
  if (actvToken && pathname !== '/auth/verify') {
    return NextResponse.redirect(new URL('/auth/verify', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
