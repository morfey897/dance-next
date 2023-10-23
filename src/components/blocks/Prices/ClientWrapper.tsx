'use client';

import Section from "@/components/elements/Section";
import { PriceType } from "@/models/price";
import Group from "./Group";
import { GroupItem, Item } from "./Items";
import { SettingsType } from "@/models/settings";
import { I18Provider } from "@/components/hooks/useTranslation";

function ClientWrapper({ settings, list }: { settings: SettingsType; list: Array<{ _id: string; headline: string; items: Array<PriceType & { items?: PriceType[] }> }> }) {
  return <I18Provider value={settings._i18n}>
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
  </I18Provider>;
}
export default ClientWrapper;