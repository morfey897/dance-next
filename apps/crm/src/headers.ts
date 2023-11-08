import { cookies } from 'next/headers';
import { DEFAULT_LOCALE, LOCALE_COOKIE, THEME_COOKIE } from "config";

export const getLocale = (): string => {
  return cookies().get(LOCALE_COOKIE)?.value || DEFAULT_LOCALE;
}

export const getTheme = () => {
  return cookies().get(THEME_COOKIE)?.value;
}

