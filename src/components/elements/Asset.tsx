import { AssetType, ImageType } from "@/models/_default";
import { useMemo } from "react";
import Picture from './Picture';
import { buildAsset } from "@/services/sanity";

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