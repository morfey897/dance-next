import { headers } from 'next/headers';
import { defaultLocale } from "../i18n.config";
import { pathnameLocale } from "@/utils/nav";

export const getPathname = (): string => headers().get('X-Next-Pathname') || "/";

export const getLocale = (): string => {
  const pathName = getPathname();
  const pLocale = pathnameLocale(pathName);
  return pLocale || defaultLocale;
}


