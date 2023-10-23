"use client";

import { useCallback } from "react";
// import { useLocale } from "./useLocale";
// import { flatten } from "flat";
// import useSWR from 'swr';
import { createContext, useContext } from "react";
import type { I18nType } from "@/types/i18n";

const I18nContext = createContext<I18nType>(undefined);

// const fetcher = (url: string) =>
//   fetch(url, process.env.NODE_ENV === 'development' ? { cache: 'no-cache' } : { cache: 'force-cache' })
//     .then(r => r.json())
//     .then((json) => flatten<{ [key: string]: { [key: string]: string } | string }, I18nType>(json));

// function useDictionary() {

//   const context = useContext(I18nContext);
//   if (context) return context;

//   const locale = useLocale();
//   const { data } = useSWR(`/i18n/${locale}.json?q=${process.env.NEXT_PUBLIC_BUILD_ID}`, fetcher, {
//     revalidateOnFocus: false,
//     revalidateOnReconnect: false,
//   });
//   return data;
// }

export function useTranslation(base?: string) {
  
  const dictionary = useContext(I18nContext);

  const handler = useCallback((token: string, ...props: any) => {
    const key = base ? `${base}.${token}` : token;
    return dictionary && dictionary[key] || key;
  }, [dictionary, base]);

  return handler;
}

export function I18Provider({ value, children }: { value: I18nType; children: React.ReactNode }) {
  return <I18nContext.Provider value={value}>
    {children}
  </I18nContext.Provider>;
}