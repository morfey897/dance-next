import Headline from "@/components/elements/Headline";
import Article from "@/components/elements/Article";
import Section from "@/components/elements/Section";
// import Swiper from "./Swiper";
// import Controls from "./Controls";
// import Item from "./Item";
import RenderHTML from "../../elements/RenderHTML";
import { SectionType } from "@/models/page";
import { requestContent } from "@/lib/sanity.server";
import { PriceType, query as queryPrices } from "@/models/price";
import Group from "./Group";
import { GroupItem, Item } from "./Items";
import { PortableTextBlock } from '@portabletext/types';

async function getPrices(ids: Array<string> | undefined) {
  if (!ids || ids.length === 0) return [];
  return await requestContent<Array<PriceType>>(
    queryPrices({
      ids
    }),
    process.env.NODE_ENV === 'development' ? { cache: 'no-cache' } : { cache: 'force-cache', next: { revalidate: 10 * 60 } }
  );
}

async function Prices({ headline, anchor, body, divisions }: SectionType) {

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
      <Headline headline={headline}>
        <RenderHTML body={body} />
      </Headline>
      <div className="space-y-14 mt-12" >
        {list.map((group, index) => <Section animate={index % 2 ? "r-l" : 'l-r'} key={group._id}>
          <Group headline={group.headline}>
            {
              group.items.map((el) => {
                const items = el.items;
                return !items || !Array.isArray(items) || items.length === 0 ? <Item key={el._id} item={el} /> :
                  <GroupItem key={el._id} item={el} />;
              })
            }
          </Group>
        </Section>)}
      </div>
    </Section>
  </Article >;
}

export default Prices;