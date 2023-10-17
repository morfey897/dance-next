import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type DefaultProps = {
  
}

export const GROQ_TAG = 'tag';
export const GROQ_TAG_EXTEND = `
tag,
"description": coalesce(description[$locale], description[$defaultLocale]),
`;
export type TagType = {
  tag: string;
  description?: string;
}

export const GROQ_CTA = `
"title": coalesce(title[$locale], title[$defaultLocale]),
externalUrl,
internalUrl{page->{"slug": slug.current},anchor->{tag}}`;
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

export const GROQ_ASSET = `_id, 
  "caption": coalesce(caption[$locale], caption[$defaultLocale]),
  "alt": coalesce(alt[$locale], alt[$defaultLocale]),
  tags[]->{${GROQ_TAG}}, 
  image`;
export type AssetType = {
  _id: string;
  caption: string;
  alt: string;
  tags?: Array<TagType>;
  image: SanityImageSource;
}

export const GROQ_WRAPPER = 'code';
export type WrapperType = {
  code: string;
}