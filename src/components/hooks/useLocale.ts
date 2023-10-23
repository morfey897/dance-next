import { usePathname } from "next/navigation";
import { defaultLocale } from "@/i18n.config";
import { pathnameLocale } from '@/utils/nav';

export function useLocale() {

  const pathname = usePathname();

  const pLocale = pathnameLocale(pathname);

  return pLocale || defaultLocale;
}