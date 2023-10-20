import { i18nRouter } from 'next-i18n-router';
import i18nConfig from '../i18n.config';
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const response = i18nRouter(request, i18nConfig);
  // const pathname = request.nextUrl.pathname;
  // const currentLocale = response.headers.get('x-next-i18n-router-locale') || i18nConfig.defaultLocale;
  // response.headers.set('x-next-sub-pathname', currentLocale === i18nConfig.defaultLocale ? pathname : pathname.replace(`/${currentLocale}`, ''));
  // response.headers.set('x-next-pathname', pathname);
  // return response;
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