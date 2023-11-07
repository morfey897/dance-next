import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE, THEME_COOKIE } from "config";
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type LangType = (typeof LOCALES & undefined);

function getLocale(request: NextRequest) {
  const headers = { 'accept-language': request.headers.get('accept-language') || "" };
  const languages = new Negotiator({ headers })
    .languages()
    .map((lang) => lang.split('-')[0]);
  return match([...new Set(languages)], LOCALES, DEFAULT_LOCALE) as unknown as LangType;
}


export function middleware(request: NextRequest) {
  if (/\.(!?json|xml|txt|js|css|ico|png|jpg|jpeg)$/.test(request.nextUrl.pathname)) return NextResponse.next();

  const cookieValue = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = LOCALES.includes(cookieValue as LangType) ? cookieValue : getLocale(request);

  let response = NextResponse.next();
  if (cookieValue != locale) {
    const setCookies = response.headers.get('set-cookie');
    response.headers.set('set-cookie', [`${LOCALE_COOKIE}=${locale};path=/`, setCookies]
      .filter(v => Boolean(v))
      .join(','));
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|~offline|_next/static|_next/image|assets).*)',
  ],
}