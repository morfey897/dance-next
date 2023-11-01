import Headline from "@/components/elements/Headline";
import Article from "@/components/elements/Article";
import Section from "@/components/elements/Section";
import RenderHTML from "../../elements/RenderHTML";
import { SectionType } from "@/models/page";
import { PriceType } from "@/models/price";
import { SettingsType } from "@/models/settings";
import ClientWrapper from "./ClientWrapper";
import { getPrices } from "@/data/external.server";

async function Prices({ headline, anchor, body, divisions, settings }: SectionType & { settings?: SettingsType }) {

  const ids = divisions?.map(({ _id }) => _id) || [];
  const prices = (await getPrices(ids)).sort((a, b) => ids.indexOf(a._id) - ids.indexOf(b._id));

  const list = prices.reduce((acc: Array<{ _id: string; headline: string; items: Array<PriceType & { items?: PriceType[] }> }>, item) => {
    const [groupTag, ...tags] = item.tags || [];
    let group = acc.find((gr) => gr._id === groupTag?.tag);
    if (!group) {
      group = {
        _id: groupTag?.tag,
        headline: groupTag?.description || "",
        items: [],
      };
      acc.push(group);
    }

    const innerAcc = group.items;
    if (tags.length) {
      tags.forEach((tag) => {
        const innerGroup = innerAcc.find((gr) => gr._id === tag.tag);
        if (innerGroup) {
          innerGroup.items?.push(item);
        } else {
          innerAcc.push({
            _id: tag.tag,
            headline: tag.description || "",
            items: [item],
            price: 0,
            oldPrice: 0,
            currency: '',
          });
        }
      });
    } else {
      innerAcc.push(item);
    }
    return acc;
  }, []).sort((a, b) => {
    if (!a._id && b._id) return -1;
    if (a._id && !b._id) return 1;
    return b.items.length - a.items.length;
  });

  return <Article effect={{ x: 'right', y: 'bottom' }} anchor={anchor?.tag}>
    <Section animate="b-t">
      <Headline headline={headline} className="uppercase text-3xl md:text-7xl text-center">
        <RenderHTML body={body} />
      </Headline>
      <ClientWrapper settings={settings} list={list} />
    </Section>
  </Article >;
}

export default Prices;