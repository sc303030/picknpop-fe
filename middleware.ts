import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isTokenExpired, refreshAccessToken } from '@/app/utils/token';
import { getCookie, setCookie } from '@/app/utils/cookies';

export async function middleware(req: NextRequest) {
  const access = getCookie('token', req);
  const refresh = getCookie('refresh_token', req);

  if (!access) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (isTokenExpired(access) && refresh) {
    try {
      const newAccessToken = await refreshAccessToken(refresh);
      const response = NextResponse.next();
      response.cookies.set('token', newAccessToken, { path: '/', maxAge: 7 * 24 * 60 * 60 });

      return response;
    } catch (error) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

// 보호할 경로 설정
export const config = {
  matcher: ['/profile/:path*'],
};
