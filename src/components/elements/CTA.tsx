import { CTAType } from "@/models/page";
import { useMemo } from "react";

function CTA({ cta, children, ...rest }: React.HTMLProps<HTMLAnchorElement> & { cta?: CTAType }) {

  const props = useMemo<{ href: string; rel?: string }>(() => {
    if (cta?.internalUrl) {
      return {
        href: [cta.internalUrl?.page?.slug || "/", cta.internalUrl?.anchor?.tag].filter(Boolean).join("#")
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
  }, [cta]);

  return <a aria-label={cta?.title || ""} {...rest} {...props}>
    {children}
  </a>
}

export default CTA;