"use client";

import clsx from "clsx";
import Link from "next/link";
import { useLocale } from "@/components/hooks/useLocale";
import { LOCALE_COOKIE, locales } from "../../../i18n.config";
import { usePathname } from "next/navigation";
import { replaceLocale } from "@/utils/nav";
import LangTranslate from "./LangTranslate";

function Languages() {

  const locale = useLocale();
  const pathname = usePathname();

  const onClick = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${LOCALE_COOKIE}=${newLocale};expires=${date.toUTCString()};path=/`;
  };

  return <div className="relative group">
    <button name="language" className="flex items-baseline gap-x-1">
      <LangTranslate lang={locale} short />
    </button>

    <ul className="absolute top-full right-0 -translate-y-2 transition-all invisible opacity-0 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 bg-black bg-opacity-60 p-2.5 space-y-4 rounded-sm">
      {
        locales.filter(locale => locale != 'ru').map((toLocale) => (
          <li key={toLocale} className="text-center">
            <Link href={replaceLocale(pathname, toLocale)} onClick={() => onClick(toLocale)} className={clsx("flex items-baseline justify-center gap-x-1  hover:text-slate-200", toLocale === locale && 'text-gray-600 pointer-events-none')}>
              <LangTranslate lang={toLocale} className={clsx(locale === toLocale && "animate-pulse")} />
            </Link>
          </li>
        ))
      }
    </ul>
  </div>
}

export default Languages;