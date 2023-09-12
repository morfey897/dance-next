import { PortableTextBlock } from '@portabletext/types';
import { DefaultProps, TagType, GROQ_TAG, AssetType, GROQ_ASSET, CTAType, GROQ_CTA, WrapperType, GROQ_WRAPPER } from './_default';

const GROQ_SECTION = `_id, headline, anchor->{${GROQ_TAG}}, wrapper->{${GROQ_WRAPPER}}, images[]->{${GROQ_ASSET}}, body, callToAction->{${GROQ_CTA}}, divisions[]->{_id}`;
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

const GROQ_PAGE = `title, "slug": slug.current, seoDescription, ogTitle, ogDescription, ogImage->{${GROQ_ASSET}}, sections[]->{${GROQ_SECTION}}`;
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