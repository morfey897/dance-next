"use client";

import { CTAType } from "@/models/_default";
import { memo, useMemo } from "react";
import { useLocale } from "@/components/hooks/useLocale";
import { joinPath } from "@/utils/str";
import Link from "next/link";

function CTA({ cta, children, ...rest }: Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'> & { cta?: CTAType }) {

  const locale = useLocale();

  const props = useMemo<{ href: string; rel?: string }>(() => {
    if (cta?.internalUrl) {
      const slug = cta.internalUrl?.page?.slug || "/";
      const anchor = cta.internalUrl?.anchor?.tag;
      return {
        href: joinPath("#", joinPath("/", "/", locale, slug), anchor)
      }
    }

    if (cta?.externalUrl) {
      return {
        href: cta.externalUrl,
        rel: 'nofollow'
      }
    }
    return {
      href: "#"
    }
  }, [cta, locale]);
  return cta ? <Link aria-label={cta?.title || ""} {...props} {...rest}>
    {!!children ? children : cta?.title}
  </Link> : null;
}

export default memo(CTA);