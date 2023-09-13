import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { AssetType, ImageType } from "@/models/_default";

const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
});

export const urlFor = (source?: SanityImageSource) => builder.image(source || process.env.NEXT_PUBLIC_NO_IMAGE || "");

export function buildAsset(asset: AssetType, quality: number = 75): ImageType {
  const builder = urlFor(asset.image);
  const id = builder.quality(quality || 75).url();
  const [width, height] = (id.match(/-(\d+)x(\d+)(?:\.[\w\d]+\?)?/) || [])
    .slice(1, 3)
    .map((num: string) => parseInt(num, 10));

  return {
    src: id,
    alt: asset.alt,
    width: width,
    height: height,
  }
}