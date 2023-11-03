import { DEFAULT_LOCALE, LOCALES } from 'config';

export function pathnameLocale(pathname: string) {
  return LOCALES
    .filter(locale => locale != DEFAULT_LOCALE)
    .find(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    
}

export function replaceLocale(pathname: string, toLocale: string) {
  const pLocale = pathnameLocale(pathname);
  toLocale = toLocale === DEFAULT_LOCALE ? '' : `/${toLocale}`;
  return pLocale ? pathname.replace(`/${pLocale}`, toLocale) : `${toLocale}${pathname}`;
}