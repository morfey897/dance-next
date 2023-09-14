import { PortableTextBlock } from '@portabletext/types';
import { DefaultProps, TagType, GROQ_TAG, AssetType, GROQ_ASSET, CTAType, GROQ_CTA, WrapperType, GROQ_WRAPPER } from './_default';

const GROQ_SECTION = `_id, 
  "headline": coalesce(headline[$locale], headline[$defaultLocale]),
  "menuName": coalesce(menuName[$locale], menuName[$defaultLocale]), 
  "body": coalesce(body[$locale], body[$defaultLocale]),
  anchor->{${GROQ_TAG}}, 
  wrapper->{${GROQ_WRAPPER}}, 
  images[]->{${GROQ_ASSET}}, 
  callToAction->{${GROQ_CTA}}, 
  divisions[]->{_id}`;
export type SectionType = {
  _id: string;
  headline: string;
  menuName: string;
  anchor?: TagType,
  wrapper: WrapperType,
  images?: Array<AssetType>;
  body?: PortableTextBlock;
  callToAction?: CTAType;
  divisions?: Array<{
    _id: string;
  }>;
}

const GROQ_PAGE = `"slug": slug.current,
  "title": coalesce(title[$locale], title[$defaultLocale]),
  "description": coalesce(description[$locale], description[$defaultLocale]), 
  "ogTitle": coalesce(ogTitle[$locale], ogTitle[$defaultLocale]), 
  "ogDescription": coalesce(ogDescription[$locale], ogDescription[$defaultLocale]), 
  ogImage->{${GROQ_ASSET}}, 
  sections[]->{${GROQ_SECTION}}`;
export type PageType = {
  name: string;
  title: string;
  description: string;
  slug: string;
  ogDescription: string;
  ogTitle: string;
  ogImage: AssetType;
  sections: Array<SectionType>;
}

type PageProps = {
  slug: string;
} & DefaultProps;

export const query = (props: PageProps) => `*[_type == "page" && slug.current == "${props.slug}"][0]{${GROQ_PAGE}}`