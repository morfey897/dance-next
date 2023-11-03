import Headline from "@/components/elements/Headline";
import Article from "@/components/elements/Article";
import Section from "@/components/elements/Section";
import Swiper from "./Swiper";
import Controls from "./Controls";
import Item from "./Item";
import RenderHTML from "../../elements/RenderHTML";
import { SectionType } from "@/models/page";
import { AssetType } from "@/models/_default";

function Gallery({ headline, anchor, body, images }: SectionType) {

  return <Article effect={{ x: 'left' }} anchor={anchor?.tag}>
    <Section animate="b-t">
      <Headline headline={headline} className="uppercase text-3xl md:text-7xl text-center">
        <RenderHTML body={body} />
      </Headline>
    </Section>
    <Section animate="r-l">
      <Swiper<AssetType> items={images} Controls={Controls} Item={Item} autoScroll={5} startAt={1} />
    </Section>
  </Article >;
}

export default Gallery;