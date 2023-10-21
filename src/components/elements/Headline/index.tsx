import React, { memo } from "react";
import Heading from "./Heading";
import type { HeadingType } from "./Heading";
import clsx from "clsx";

function Headline({ headline, subheadline, children, className, bodyClassName, as }: { as?: HeadingType; headline: string; subheadline?: string; children?: React.ReactNode; className?: string; bodyClassName?: string; }) {
  return <>
    <Heading as={as || 'h2'} className={className}>{headline}</Heading>
    {(!!subheadline || !!children) && <div className={clsx("text-xs md:text-base mt-7 max-w-screen-md m-auto text-center", bodyClassName)}>
      {subheadline && <p>{subheadline}</p>}
      {children}
    </div>}
  </>;
}

export default memo(Headline);