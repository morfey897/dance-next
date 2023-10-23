import { defaultLocale, locales } from '../../i18n.config';

export function pathnameLocale(pathname: string) {
  return locales
    .filter(locale => locale != defaultLocale)
    .find(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    
}

export function replaceLocale(pathname: string, toLocale: string) {
  const pLocale = pathnameLocale(pathname);
  toLocale = toLocale === defaultLocale ? '' : `/${toLocale}`;
  return pLocale ? pathname.replace(`/${pLocale}`, toLocale) : `${toLocale}${pathname}`;
}