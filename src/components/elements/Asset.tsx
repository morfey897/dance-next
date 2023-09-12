import { AssetType, ImageType } from "@/models/_default";
import { useMemo } from "react";
import Picture from './Picture';
import { urlFor } from "@/services/sanity";

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

function Asset({ asset, alt: alternative, src: resource, width: w, height: h, quality, asBackground, ...props }: { asset?: AssetType; asBackground?: boolean; quality?: number; } & React.ImgHTMLAttributes<HTMLPictureElement>) {

  const rest = useMemo<ImageType>(() => {

    if (asset) {
      const { src, alt, width, height } = buildAsset(asset);

      return {
        src: src,
        alt: alt ?? alternative,
        width: width || (typeof w === 'string' ? parseInt(w) : 0),
        height: height || (typeof h === 'string' ? parseInt(h) : 0),
      }
    }

    return {
      src: resource || '',
      alt: alternative || '',
      width: typeof w === 'string' ? parseInt(w) : 0,
      height: typeof h === 'string' ? parseInt(h) : 0,
    }

  }, [asset, alternative, resource, w, h]);

  return <Picture {...props} {...rest} showLoadingState={!asBackground} />;
}

export default Asset;