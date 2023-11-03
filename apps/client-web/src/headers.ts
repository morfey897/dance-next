import { headers } from 'next/headers';
import { DEFAULT_LOCALE } from "config";
import { pathnameLocale } from "@/utils/nav";

export const getPathname = (): string => headers().get('X-Next-Pathname') || "/";

export const getLocale = (): string => {
  const pathName = getPathname();
  const pLocale = pathnameLocale(pathName);
  return pLocale || DEFAULT_LOCALE;
}


