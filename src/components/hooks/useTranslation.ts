import { useCurrentLocale } from "next-i18n-router/client";
import i18nConfig from "../../../i18n.config";

export function useTranslation(token: string, translation?: Record<string, { [lang: string]: string }>) {
  const locale = useCurrentLocale(i18nConfig) || "";
  return translation && translation[token] && translation[token][locale] || token;;
}