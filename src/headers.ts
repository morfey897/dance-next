import { headers } from 'next/headers';
import { defaultLocale } from "@/i18n.config";

export const getLocale = (): string => headers().get('x-next-locale') || defaultLocale;
export const getPathname = (): string => headers().get('x-next-pathname') || "";
export const getSubPathname = (): string => headers().get('x-next-sub-pathname') || "";

