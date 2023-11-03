"use client";

import { useCallback } from "react";
import { createContext, useContext } from "react";
import type { I18nType } from "@/types/i18n";
import { matchDictionary } from "@/utils/str";

const I18nContext = createContext<I18nType>(undefined);

export function I18Provider({ value, children }: { value: I18nType; children: React.ReactNode }) {
  return <I18nContext.Provider value={value}>
    {children}
  </I18nContext.Provider>;
}

export function useI18n(base?: string) {

  const dictionary = useContext(I18nContext);

  const handler = useCallback((token: string, ...props: any) => {
    return matchDictionary(base ? `${base}.${token}` : token, dictionary, props);
  }, [dictionary, base]);

  return handler;
}
