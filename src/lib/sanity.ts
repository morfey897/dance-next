import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource, ImageFormat } from '@sanity/image-url/lib/types/types';
import { AssetType } from "@/models/_default";

const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
});

export const urlFor = (source?: SanityImageSource) => builder.image(source || process.env.NEXT_PUBLIC_NO_IMAGE || "");

export const parseSize = (source: AssetType | SanityImageSource | string | undefined): { width: number | undefined; height: number | undefined; } => {
  if (!source) return { width: undefined, height: undefined };
  if (typeof (source as AssetType)?.image != 'undefined') {
    source = urlFor((source as AssetType)?.image).url();
  } else if (typeof source !== 'string') {
    source = urlFor(source).url();
  }
  const [width, height] = (source.match(/-(\d+)x(\d+)(?:\.[\w\d]+\?)?/) || [])
    .slice(1, 3)
    .map((num: string) => {
      const n = parseInt(num, 10);
      return typeof n != 'number' || isNaN(n) ? undefined : n;
    });

  return { width, height };
}

export function buildAsset(source: AssetType | SanityImageSource, { w, h, q, fm }: { w?: number; h?: number; q?: number; fm?: ImageFormat } = {}) {
  let builder = urlFor((source as AssetType)?.image || source);
  builder = builder.quality(q || 75);
  if (!!w && !isNaN(w)) {
    builder = builder.width(w);
  }
  if (!!h && !isNaN(h)) {
    builder = builder.height(h);
  }
  if (!!fm) {
    builder = builder.format(fm);
  }
  return builder.url();
}