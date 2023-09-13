"use client";

import Section from "@/components/elements/Section";
import clsx from "clsx";
import { Wrapper } from "@googlemaps/react-wrapper";
import CanvasMap from "./CanvasMap";

function MapSection({ geo }: { geo: { lat: number; lng: number; } }) {
  return <Section animate="l-r" className="h-full" render={(inView) => <div className={clsx("h-[300px] lg:min-h-[500px] lg:h-full -mb-16 lg:mb-0 -mx-4 lg:mx-0 lg:w-full bg-white", !inView && 'animate-pulse')}>
    {inView && <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""}>
      <CanvasMap center={{ ...geo }} zoom={16} className="w-full h-[inherit]" />
    </Wrapper>}
  </div>} />;
}

export default MapSection;