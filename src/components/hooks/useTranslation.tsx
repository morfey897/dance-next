"use client";

import { useCallback } from "react";
import { useLocale } from "./useLocale";
import { flatten } from "flat";
import { matchDictionary } from "@/utils/str";

type DictionaryType = Record<string, { [key: string]: string | { [key: string]: string } }>;

export function useTranslation(dictionary: DictionaryType) {

  const locale = useLocale();

  const handler = useCallback((token: string, ...props: any) => {
    const list = (dictionary ? flatten<DictionaryType, Record<string, string>>(dictionary) : {});
    return matchDictionary(`${locale}.${token}`, list, props);
  }, [dictionary, locale]);

  return handler;
}