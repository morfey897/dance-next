import { locales, defaultLocale } from '@/i18n.config';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest) {
  const headers = { 'accept-language': request.headers.get('accept-language') || "" };
  const languages = new Negotiator({ headers })
    .languages()
    .map((lang) => lang.split('-')[0]);
  return match([...new Set(languages)], locales, defaultLocale);
}
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  let newLocale;
  let response;
  if (pathnameLocale) {
    if (request.headers.get('x-next-locale') === pathnameLocale) return;
    response = NextResponse.rewrite(request.nextUrl);
    newLocale = pathnameLocale;
  } else {
    let locale = getLocale(request);
    if (locale === 'ru') {
      locale = defaultLocale;
    }
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    response = NextResponse.redirect(request.nextUrl);
    newLocale = locale;
  }

  response.headers.set('x-next-locale', newLocale);
  response.headers.set('x-next-pathname', pathname);
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
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sitemap.xml|robots.txt|site.webmanifest|browserconfig.xml).*)',
  ],
}