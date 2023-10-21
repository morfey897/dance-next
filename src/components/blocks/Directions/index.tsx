import Article from "@/components/elements/Article";
import Headline from "@/components/elements/Headline";

import RenderHTML from "@/components/elements/RenderHTML";

import { SectionType } from "@/models/page";
import { requestContent } from "@/lib/sanity.server";
import { DirectionType, query as queryDirections } from "@/models/direction";

import ClientWrapper from "./ClientWrapper";
import Section from "@/components/elements/Section";

async function getDirections(ids: Array<string> | undefined) {
  if (!ids || ids.length === 0) return [];
  return await requestContent<Array<DirectionType>>(
    queryDirections({
      ids
    }),
    process.env.NODE_ENV === 'development' ? { cache: 'no-cache' } : { cache: 'force-cache', next: { revalidate: 10 * 60 } }
  );
}

async function Directions({ headline, anchor, divisions, body }: SectionType) {

  const ids = divisions?.map(({ _id }) => _id) || [];
  const directions = (await getDirections(ids)).sort((a, b) => ids.indexOf(a._id) - ids.indexOf(b._id));;

  return <Article effect={{ x: 'left', y: 'center' }} anchor={anchor?.tag}>
    <Section animate="b-t">
      <Headline headline={headline} className="uppercase text-3xl md:text-7xl text-center">
        <RenderHTML body={body} />
      </Headline>
      {directions?.length > 0 && <ClientWrapper directions={directions} />}
    </Section>
  </Article>;
}

export default Directions;