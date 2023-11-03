"use client";
import clsx from "clsx";
import Image from 'next/image';
import { useState } from "react";
import LoadingIndicator from "./LoadingIndicator";

function Picture({ alt, src, width, height, quality, inline, lazyload, className, ...props }: { lazyload?: boolean; inline?: boolean; quality?: number; } & React.ImgHTMLAttributes<HTMLImageElement>) {

  const [loaded, setLoaded] = useState(false);

  const w = inline && typeof width === 'string' ? parseInt(width) : undefined;
  return (
    <picture className={clsx('relative', className)} {...props}>
      {!!src && <Image
        src={src}
        alt={alt || ''}
        width={typeof width === 'string' ? parseInt(width) : width}
        height={typeof height === 'string' ? parseInt(height) : height}
        quality={quality}
        loading={lazyload ? 'lazy' : 'eager'}
        onLoadingComplete={() => {
          setLoaded(true);
        }}
      />}
      {!!src &&
        (lazyload === true || typeof lazyload === 'undefined') &&
        <LoadingIndicator
          className={clsx("absolute left-1/2 top-1 -translate-x-1/2", loaded && 'hidden')}
          style={w ? { left: w / 2 } : undefined} />}
    </picture>
  );
}


export default Picture;