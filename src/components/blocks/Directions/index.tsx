import Article from "../../elements/Article";
import Headline from "../../elements/Headline";

import RenderHTML from "../../elements/RenderHTML";

import { SectionType } from "@/models/page";
import { request } from "@/services/sanity";
import { DirectionType, query as queryDirections } from "@/models/direction";

import { getLocale } from '@/headers';

import { buildAsset } from "@/components/elements/Asset";

import ClientWrapper from "./ClientWrapper";
import { ImageType } from "@/models/_default";
import Section from "@/components/elements/Section";

async function getDirections(ids: Array<string> | undefined) {
  if (!ids || ids.length === 0) return [];
  const locale = getLocale();
  return await request<Array<DirectionType>>(queryDirections({
    locale, ids
  }));
}

async function Directions({ headline, anchor, divisions, body }: SectionType) {

  const directions: Array<DirectionType> = await getDirections(divisions?.map(({ _id }) => _id));

  const images = directions.reduce<Record<string, Array<ImageType>>>((prev, item) => {
    prev[item._id] = item.images?.map(asset => buildAsset(asset)) || [];
    return prev;
  }, {});

  return <Article effect={{ x: 'left', y: 'center' }} anchor={anchor?.tag}>
    <Section animate="b-t">
      <Headline headline={headline}>
        <RenderHTML value={body} />
      </Headline>
      {directions?.length > 0 && <ClientWrapper directions={directions} images={images} />}
    </Section>
  </Article>;
}

export default Directions;