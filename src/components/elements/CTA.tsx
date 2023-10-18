"use client";

import { CTAType } from "@/models/_default";
import { useMemo } from "react";
import { useLocale } from "@/components/hooks/useLocale";
import { joinPath } from "@/utils/str";

function CTA({ cta, children, ...rest }: React.HTMLProps<HTMLAnchorElement> & { cta?: CTAType }) {

  const { locale, isDefault } = useLocale();

  const props = useMemo<{ href: string; rel?: string }>(() => {
    if (cta?.internalUrl) {
      const slug = cta.internalUrl?.page?.slug || "/";
      const anchor = cta.internalUrl?.anchor?.tag;
      return {
        href: joinPath("#", joinPath("/", "/", (isDefault ? undefined : locale), slug), anchor)
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
  }, [cta, isDefault, locale]);

  return <a aria-label={cta?.title || ""} {...rest} {...props}>
    {!!children ? children : cta?.title}
  </a>
}

export default CTA;