import { AssetType } from "@/models/_default";
import { useMemo } from "react";
import { buildAsset, parseSize } from "@/lib/sanity";

const MOBILE_WIDTH = 640;

type ImgType = {
  src: string | undefined;
  width: string | number | undefined;
  height: string | number | undefined;
};

type SourceType = {
  type?: string | undefined;
  media: string;
  srcSet: string;
}

function Asset({ asset, alt: alternative, src: resource, width: tagWidth, height: tagHeight, quality, ...props }: { asset?: AssetType; quality?: number; } & React.ImgHTMLAttributes<HTMLPictureElement>) {

  const pictureProps = useMemo<{ imgProps: ImgType | undefined; sources: Array<SourceType> } | undefined>(() => {
    if (!asset) return
    const parsedWidth = typeof tagWidth === 'string' ? parseInt(tagWidth as string) : tagWidth;
    const parsedHeight = typeof tagHeight === 'string' ? parseInt(tagHeight as string) : tagHeight;
    const url = buildAsset(asset, { q: quality, w: parsedWidth, h: parsedHeight });
    const { width, height } = parseSize(asset);
    return {
      sources: [
        {
          srcSet: buildAsset(asset, { q: quality, fm: 'webp', w: MOBILE_WIDTH }),
          type: 'image/webp',
          media: `(max-width: ${MOBILE_WIDTH - 1}px)`
        },
        {
          srcSet: buildAsset(asset, { q: quality, w: MOBILE_WIDTH }),
          media: `(max-width: ${MOBILE_WIDTH - 1}px)`
        },
        {
          srcSet: buildAsset(asset, { q: quality, fm: 'webp' }),
          type: 'image/webp',
          media: `(min-width: ${MOBILE_WIDTH}px)`
        },
        {
          srcSet: buildAsset(asset, { q: quality }),
          media: `(min-width: ${MOBILE_WIDTH}px)`
        },
      ],
      imgProps: {
        src: url,
        width: parsedWidth || width,
        height: parsedHeight || height,
      },

    }
  }, [asset, tagWidth, tagHeight, quality]);

  return <picture {...props}>
    {pictureProps?.sources.map((props) => <source key={props.srcSet} {...props} />)}
    <img alt={asset?.alt ?? asset?.caption ?? alternative} {...pictureProps?.imgProps} loading={'lazy'} decoding="async" />
  </picture>;
}

export default Asset;