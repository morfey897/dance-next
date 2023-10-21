import { usePathname } from "next/navigation";
import { locales, defaultLocale } from "@/i18n.config";

export function useLocale() {

  const pathname = usePathname();

  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  return pathnameLocale || defaultLocale;
}