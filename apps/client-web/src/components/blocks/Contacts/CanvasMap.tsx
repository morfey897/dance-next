"use client";

import { MarkerWithLabel } from "@googlemaps/markerwithlabel";
import { memo, useEffect, useRef } from "react";

function CanvasMap({ center, zoom, className, ...props }: { center: google.maps.LatLngLiteral; zoom: number; } & React.HTMLProps<HTMLDivElement>) {

  const ref = useRef(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const map = new window.google.maps.Map(target, {
      center,
      zoom,
      mapTypeId: window.google.maps.MapTypeId.TERRAIN
    });

    const market = new MarkerWithLabel({
      position: center,
      animation: window.google.maps.Animation.BOUNCE,
      map: map,
      labelContent: ".",
    })
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return <div className={className} ref={ref} {...props} />;
}

export default memo(CanvasMap);