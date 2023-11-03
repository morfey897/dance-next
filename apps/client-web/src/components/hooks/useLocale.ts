import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE } from "config";
import { pathnameLocale } from '@/utils/nav';

export function useLocale() {

  const pathname = usePathname();

  const pLocale = pathnameLocale(pathname);

  return pLocale || DEFAULT_LOCALE;
}