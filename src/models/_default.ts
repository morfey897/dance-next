import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type DefaultProps = {
  locale: string;
}

export const GROQ_TAG = 'tag';
export type TagType = {
  tag: string;
}

export const GROQ_CTA = 'title, internalUrl{page->{"slug": slug.current},anchor->{tag}}, externalUrl';
export type CTAType = {
  title: string;
  internalUrl?: {
    anchor?: {
      tag: string;
    };
    page?: {
      slug: string;
    };
  };
  externalUrl?: string;
}

export const GROQ_ASSET = `_id, caption, alt, tags[]->{${GROQ_TAG}}, image`;
export type AssetType = {
  _id: string;
  caption: string;
  alt: string;
  tags?: Array<TagType>;
  image: SanityImageSource;
}

export type ImageType = {
  src: string | undefined;
  alt: string | undefined;
  width: number | undefined;
  height: number | undefined;
}

export const GROQ_WRAPPER = 'code';
export type WrapperType = {
  code: string;
}