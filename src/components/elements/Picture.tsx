"use client";
import clsx from "clsx";
import Image from 'next/image';
import { useState } from "react";

const LoadingIndicator = ({ loaded, width }: { loaded: boolean; width: number | undefined; }) => (
  <div className={clsx("absolute left-1/2 top-1 -translate-x-1/2", loaded && 'hidden')} style={width ? { left: width / 2 } : undefined} role="status">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
      <span className="relative !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" />
    </div>
  </div>
);

function Picture({ alt, src, width, height, quality, inline, lazyload, className, ...props }: { lazyload?: boolean; inline?: boolean; quality?: number; } & React.ImgHTMLAttributes<HTMLImageElement>) {

  const [loaded, setLoaded] = useState(false);

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
      {!!src && (lazyload === true || typeof lazyload === 'undefined') && <LoadingIndicator loaded={loaded} width={inline && typeof width === 'string' ? parseInt(width) : undefined} />}
    </picture>
  );
}


export default Picture;