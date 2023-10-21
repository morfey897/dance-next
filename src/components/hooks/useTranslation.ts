import { useLocale } from "./useLocale";
import type { DictionaryType } from "@/types/i18n";

export function useTranslation(token: string, translation: DictionaryType): string {
  const locale = useLocale();
  return translation && translation[token] && translation[token][locale] || token;;
}