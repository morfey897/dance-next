import { PortableTextBlock } from '@portabletext/types';
import { DefaultProps, TagType, GROQ_TAG_EXTEND } from './_default';
import { locales, currencies } from '../../i18n.config';

const GROQ_PRICE = `_id, 
  "headline": coalesce(headline[$locale], headline[$defaultLocale]), 
  "body": coalesce(body[$locale], body[$defaultLocale]),  
  tags[]->{${GROQ_TAG_EXTEND}},
  labels[]->{${GROQ_TAG_EXTEND}},
  price,
  oldPrice,
  currency
  `;
export type PriceType = {
  _id: string;
  headline: string;
  tags?: Array<TagType>,
  labels?: Array<TagType>,
  body?: PortableTextBlock;
  price: number;
  oldPrice: number;
  currency: string;
}

type PriceProps = {
  ids: string[];
} & DefaultProps;

export const query = (props: PriceProps) => `*[_type == "price" && _id in [${props.ids.map(id => `"${id}"`).join(",")}]]{${GROQ_PRICE}}`