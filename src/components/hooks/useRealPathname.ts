import { usePathname } from 'next/navigation';
import i18nConfig from "../../../i18n.config";

export function useRealPathname() {
  const pathname = usePathname();

  const pathLocale = i18nConfig.locales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  return !pathLocale ? pathname : pathname.replace(`/${pathLocale}`, '');
}