import { PortableTextBlock } from '@portabletext/types';
import { DefaultProps, TagType, GROQ_TAG, AssetType, GROQ_ASSET, CTAType, GROQ_CTA } from './_default';

const GROQ_DIRECTION = `_id, 
  "headline": coalesce(headline[$locale], headline[$defaultLocale]), 
  "body": coalesce(body[$locale], body[$defaultLocale]),  
  tags[]->{${GROQ_TAG}}, 
  images[]->{${GROQ_ASSET}}, 
  callToAction->{${GROQ_CTA}}`;
export type DirectionType = {
  _id: string;
  headline: string;
  tags?: Array<TagType>,
  images?: Array<AssetType>;
  body?: PortableTextBlock;
  callToAction?: CTAType;
}

type DirectionProps = {
  ids: string[];
} & DefaultProps;

export const query = (props: DirectionProps) => `*[_type == "direction" && _id in [${props.ids.map(id => `"${id}"`).join(",")}]]{${GROQ_DIRECTION}}`