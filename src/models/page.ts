import { PortableTextBlock } from '@portabletext/types';
import { DefaultProps } from './_default';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type BlockContentType = {

};

export const GROQ_TAG = 'tag';
export type TagType = {
  tag: string;
}

export const GROQ_WRAPPER = 'code';
export type WrapperType = {
  code: string;
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

export const GROQ_SECTION = `_id, name, headline, anchor->{${GROQ_TAG}}, wrapper->{${GROQ_WRAPPER}}, images[]->{${GROQ_ASSET}}, body, callToAction->{${GROQ_CTA}}, divisions[]->{_id}`;
export type SectionType = {
  _id: string;
  headline: string;
  anchor?: TagType,
  wrapper: WrapperType,
  images?: Array<AssetType>;
  body?: PortableTextBlock;
  callToAction?: CTAType;
  divisions?: Array<{
    _id: string;
  }>;
}

export const GROQ_PAGE = `title, "slug": slug.current, seoDescription, ogTitle, ogDescription, ogImage->{${GROQ_ASSET}}, sections[]->{${GROQ_SECTION}}`;
export type PageType = {
  name: string;
  title: string;
  slug: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: AssetType;
  sections: Array<SectionType>;
}

type PageProps = {
  slug: string;
} & DefaultProps;

export const query = (props: PageProps) => `*[_type == "page" && slug.current == "${props.slug}"][0]{${GROQ_PAGE}}`