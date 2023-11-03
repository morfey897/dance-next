import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES } from "config";
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
  const { pathname } = request.nextUrl;
  const pathnameLocale = LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  ) as LangType;

  let response;
  if (pathnameLocale) {
    if (pathnameLocale != DEFAULT_LOCALE) {
      response = NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(pathname.replace(`/${pathnameLocale}`, ""), request.url));
    }
  } else {
    const cookieValue = request.cookies.get(LOCALE_COOKIE)?.value;

    const locale = LOCALES.includes(cookieValue as LangType) ? cookieValue : getLocale(request);
    if (locale != DEFAULT_LOCALE) {
      return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    } else {
      response = NextResponse.rewrite(new URL(`/${locale}${pathname}`, request.url));
    }
  }

  response.headers.set('X-Next-Pathname', pathname);
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