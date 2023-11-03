"use client";

import clsx from "clsx";
import { useLocale } from "@/components/hooks/useLocale";
import { LOCALE_COOKIE, LOCALES } from "config";
import { usePathname } from "next/navigation";
import { replaceLocale } from "@/utils/nav";
import LangTranslate from "./LangTranslate";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Languages() {

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState("");

  const onClick = (newLocale: string) => {
    setActive(newLocale);
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${LOCALE_COOKIE}=${newLocale};expires=${date.toUTCString()};path=/`;

    router.push(replaceLocale(pathname, newLocale));
    router.refresh();
  };

  return <div className="relative group">
    <button aria-label="multi language" className="flex items-baseline gap-x-1">
      <LangTranslate lang={locale} short />
    </button>

    <ul className="absolute top-full right-0 invisible opacity-0 -translate-y-2 transition-all  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 bg-black bg-opacity-60 p-2.5 space-y-4 rounded-sm">
      {
        LOCALES.filter(locale => locale != 'ru').map((toLocale) => (
          <li key={toLocale} className="text-center">
            <button aria-label={`translate to ${toLocale}`} onClick={() => onClick(toLocale)}
              disabled={(toLocale === locale || toLocale === active)}
              className={clsx("flex items-baseline justify-center gap-x-1 hover:text-slate-200",
                (toLocale === locale || toLocale === active) && 'text-gray-600 pointer-events-none')
              }
            >
              <LangTranslate transition={toLocale === active} lang={toLocale} />
            </button>
          </li>
        ))
      }
    </ul>
  </div>
}

export default Languages;