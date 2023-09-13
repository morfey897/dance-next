'use client';

import clsx from "clsx";
import { memo } from "react";
import Asset from "@/components/elements/Asset";
import { AssetType } from "@/models/_default";

function Item({ asset, className, ...props }: { asset: AssetType } & React.HTMLProps<HTMLDivElement>) {

  const headline = asset.caption ?? asset.alt;
  return <div className={clsx('relative w-full h-full', className)} {...props}>
    <Asset asset={asset} className="[&>img]:object-cover [&>img]:w-[inherit] [&>img]:h-[inherit] w-[inherit] h-[inherit]" />
    {!!headline && <div className="text-sm absolute bottom-0 left-0 right-0 bg-[#161616]">
      <p className="px-1 py-1">{headline}</p>
    </div>}
  </div>
}

export default memo(Item);