import { useCurrentLocale } from "next-i18n-router/client";
import i18nConfig from "../../../i18n.config";

export function useLocale() {
  const locale = useCurrentLocale(i18nConfig) || "";
  return { locale, defaultLocale: i18nConfig.defaultLocale, isDefault: locale === i18nConfig.defaultLocale };
}