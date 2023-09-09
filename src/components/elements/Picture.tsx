import { AssetType } from "@/models/page";
import { lazy, useMemo } from "react";
import Image from 'next/image';
import { urlFor } from "@/services/sanity";
// import { concatPaths } from "../../utils/url";
// import { useEnv } from "../providers/EnvProvider";


const getDimension = (id: string) => {
  id = id.trim();
  const [width, height] = (id.match(/-(\d+)x(\d+)(?:\.[\w\d]+\?)?/) || [])
    .slice(1, 3)
    .map((num: string) => parseInt(num, 10));

  const aspectRatio = width / height;
  return { width, height, aspectRatio };
}

export function Picture({ image, alt: alternative, src: resource, width: w, height: h, quality, ...props }: { image?: AssetType; quality?: number; } & React.ImgHTMLAttributes<HTMLPictureElement>) {

  const rest = useMemo<{ src: string; alt: string; width?: number; height?: number; }>(() => {

    if (image) {
      const asset = urlFor(image.image);
      const id = asset.quality(quality || 75).url();
      const dimensions = getDimension(id);

      return {
        src: id,
        alt: image.alt ?? alternative,
        width: dimensions.width || (typeof w === 'string' ? parseInt(w) : 0),
        height: dimensions.height || (typeof h === 'string' ? parseInt(h) : 0),
      }
    }

    return {
      src: resource || '',
      alt: alternative || '',
      width: typeof w === 'string' ? parseInt(w) : 0,
      height: typeof h === 'string' ? parseInt(h) : 0,
    }

  }, [image, alternative, resource]);

  return <picture  {...props}>
    <Image
      {...rest}
      loading={'lazy'}
    />
  </picture>;
}

export default Picture;